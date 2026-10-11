import { useEffect, useRef } from "react";

const MAX_DPR = 2;
const NAME = "WavesBg";

const VERT_SRC = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FRAG_SRC = `#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform float xScale;
uniform float yScale;
uniform float distortion;

out vec4 fragColor;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float d = length(p) * distortion;

  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);

  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

  fragColor = vec4(r, g, b, 1.0);
}
`;

function compile(gl, type, src, label) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(`${NAME} ${label} shader:`, gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC, "vertex");
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC, "fragment");
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(`${NAME} link:`, gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function num(v, fb) {
  return typeof v === "number" && isFinite(v) ? v : fb;
}

export default function WavesBg(props) {
  const {
    xScale = 1.0,
    yScale = 0.5,
    distortion = 0.05,
    speed = 1,
    style,
    width,
    height,
  } = props;

  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  const vRef = useRef({ xScale: 1, yScale: 0.5, distortion: 0.05, speed: 1 });
  vRef.current = {
    xScale: num(xScale, 1.0),
    yScale: num(yScale, 0.5),
    distortion: num(distortion, 0.05),
    speed: num(speed, 1),
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.error(`${NAME}: WebGL2 unavailable`);
      return;
    }

    const prog = link(gl);
    if (!prog) return;

    const uRes = gl.getUniformLocation(prog, "resolution");
    const uTime = gl.getUniformLocation(prog, "time");
    const uXScale = gl.getUniformLocation(prog, "xScale");
    const uYScale = gl.getUniformLocation(prog, "yScale");
    const uDistortion = gl.getUniformLocation(prog, "distortion");

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    let raf = 0;
    let last = -1;
    let time = 0;

    const render = (now) => {
      raf = requestAnimationFrame(render);
      const dt = last < 0 ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      const v = vRef.current;
      time += dt * 0.6 * v.speed;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || 1;
      const ch = canvas.clientHeight || 1;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }

      gl.viewport(0, 0, bw, bh);
      gl.useProgram(prog);
      gl.uniform2f(uRes, bw, bh);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uXScale, v.xScale);
      gl.uniform1f(uYScale, v.yScale);
      gl.uniform1f(uDistortion, v.distortion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#000000",
        width: typeof width === "number" && width > 0 ? width : "100%",
        height: typeof height === "number" && height > 0 ? height : "100%",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
