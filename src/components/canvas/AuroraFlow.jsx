import { useEffect, useRef } from "react";

const MAX_DPR = 2;
const RENDER_SCALE = 0.7;
const PIXEL_BUDGET = 2100000;
const NAME = "AuroraFlow";

const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`;

const FRAG_SRC = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uOn;
uniform float uSpeed;
uniform vec3  uC1;
uniform vec3  uC2;
uniform vec3  uC3;
uniform vec3  uBg;
out vec4 o;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  mat2 R = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    s += a * noise(p);
    p = R * p * 2.02;
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float t = uTime * 0.12 * uSpeed;

  vec2 mp = uMouse;
  float md = length(uv - mp);
  float pull = uOn * exp(-md * md * 3.0);
  vec2 w = uv + (uv - mp) * pull * 0.25;

  vec2 q = w * 1.4 + vec2(t * 0.5, -t * 0.3);
  float f1 = fbm(q + vec2(0.0, t * 0.4));
  float f2 = fbm(q + vec2(3.1, 1.7) - t * 0.35);
  vec2 r = vec2(f1, f2) - 0.5;
  float flow = fbm(w * 2.0 + r * 2.2 + vec2(t * 0.25, t * 0.15));

  float band = smoothstep(0.25, 0.85, flow);
  float bands = pow(band, 1.3);

  vec3 col = uBg;

  vec2 b1 = vec2(sin(t * 0.7) * 0.5 + 0.1, cos(t * 0.55) * 0.28);
  vec2 b2 = vec2(cos(t * 0.42) * 0.55 - 0.2, sin(t * 0.63) * 0.30 + 0.05);
  vec2 b3 = vec2(sin(t * 0.33 + 2.0) * 0.6, cos(t * 0.48 + 1.0) * 0.26 - 0.05);
  b1 += uMouse * uOn * 0.15;
  b2 += uMouse * uOn * 0.10;
  b3 -= uMouse * uOn * 0.12;

  float d1 = length(uv - b1);
  float d2 = length(uv - b2);
  float d3 = length(uv - b3);
  float g1 = 0.05 / (d1 * d1 + 0.045);
  float g2 = 0.05 / (d2 * d2 + 0.05);
  float g3 = 0.045 / (d3 * d3 + 0.055);

  float warpAmt = 0.35 + 0.65 * band;
  col += uC1 * g1 * warpAmt * 0.9;
  col += uC2 * g2 * warpAmt * 0.9;
  col += uC3 * g3 * bands;

  float streak = smoothstep(0.6, 1.0, abs(sin(flow * 6.2831 + t * 1.5)));
  col += mix(uC2, uC3, band) * streak * 0.06 * band;

  vec2 gg = abs(fract((uv + vec2(0.0, t * 0.15)) * 10.0) - 0.5);
  float gline = smoothstep(0.03, 0.0, min(gg.x, gg.y));
  col += vec3(0.6, 0.5, 1.0) * gline * 0.022;

  col += mix(uC1, uC2, 0.5) * pull * 0.25;

  vec3 x = clamp(col, 0.0, 8.0);
  x = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = clamp(x, 0.0, 1.0);

  col *= 1.0 - 0.28 * smoothstep(0.35, 1.5, length(uv));
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  o = vec4(col, 1.0);
}
`;

const colorCache = new Map();

function parseColor(input) {
  if (!input) return null;
  const key = String(input);
  if (colorCache.has(key)) return colorCache.get(key) ?? null;
  let s = key.trim();
  const v = s.match(/^var\(\s*--[^,]+,\s*(.+)\)$/);
  if (v) s = v[1].trim();
  let out = null;
  if (s.charAt(0) === "#") {
    let h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length >= 6) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) out = [r / 255, g / 255, b / 255];
    }
  } else {
    const m = s.match(/^(rgba?|hsla?)\(([^)]*)\)/i);
    if (m) {
      const parts = m[2].split(/[\s,/]+/).filter(Boolean);
      const f = (i) => parseFloat(parts[i]);
      if (parts.length >= 3 && [0, 1, 2].every((i) => Number.isFinite(f(i)))) {
        if (m[1].toLowerCase().startsWith("rgb")) {
          const ch = (i) => (parts[i].endsWith("%") ? f(i) / 100 : f(i) / 255);
          out = [ch(0), ch(1), ch(2)];
        } else {
          const hh = (((f(0) % 360) + 360) % 360) / 360;
          const ss = f(1) / 100;
          const ll = f(2) / 100;
          const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
          const p = 2 * ll - q;
          const hue = (t) => {
            t = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          out = [hue(hh + 1 / 3), hue(hh), hue(hh - 1 / 3)];
        }
        out = out.map((c) => Math.min(1, Math.max(0, c)));
      }
    }
  }
  colorCache.set(key, out);
  return out;
}

function color(input, fallback) {
  return parseColor(input) ?? parseColor(fallback);
}

function num(v, fb) {
  return typeof v === "number" && isFinite(v) ? v : fb;
}

function clampN(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function link(gl, frag, label) {
  const shader = (type, src) => {
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
  };
  const vs = shader(gl.VERTEX_SHADER, VERT_SRC);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(`${NAME} ${label} link:`, gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function trackPointer(root) {
  const p = { tx: 0, ty: 0, inside: false };
  const read = (e) => {
    const r = root.getBoundingClientRect();
    p.tx = e.clientX - r.left;
    p.ty = e.clientY - r.top;
    p.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  };
  const out = (e) => {
    if (!e.relatedTarget) p.inside = false;
  };
  window.addEventListener("pointermove", read, { passive: true });
  window.addEventListener("pointerdown", read, { passive: true });
  document.addEventListener("pointerout", out);
  return {
    p,
    dispose() {
      window.removeEventListener("pointermove", read);
      window.removeEventListener("pointerdown", read);
      document.removeEventListener("pointerout", out);
    },
  };
}

const DEFAULTS = {
  background: "#0A0812",
  color1: "#7B61FF",
  color2: "#2FD3F2",
  color3: "#F062C8",
};

const AuroraFlow = (props) => {
  const {
    background = DEFAULTS.background,
    color1 = DEFAULTS.color1,
    color2 = DEFAULTS.color2,
    color3 = DEFAULTS.color3,
    speed = 1,
    intensity = 0.7,
    style,
  } = props;

  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  const live = useRef({});
  live.current = {
    background,
    color1,
    color2,
    color3,
    speed: clampN(num(speed, 1), 0, 4),
    intensity: clampN(num(intensity, 0.7), 0, 2),
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false });
    if (!gl) {
      console.error(`${NAME}: WebGL2 unavailable`);
      return;
    }
    const prog = link(gl, FRAG_SRC, "main");
    if (!prog) return;
    const U = (n) => gl.getUniformLocation(prog, n);
    const u = {
      res: U("uRes"), time: U("uTime"), mouse: U("uMouse"), on: U("uOn"),
      speed: U("uSpeed"), c1: U("uC1"), c2: U("uC2"), c3: U("uC3"), bg: U("uBg"),
    };
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const pointer = trackPointer(root);
    const ptr = pointer.p;

    let on = 0;
    let raf = 0;
    let last = -1;
    let clock = 0;

    const render = (now) => {
      raf = requestAnimationFrame(render);
      const dt = last < 0 ? 0 : clampN((now - last) / 1000, 0, 0.05);
      last = now;
      const L = live.current;
      clock = (clock + dt) % 3600;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || 1200;
      const ch = canvas.clientHeight || 800;
      let bw = Math.max(1, Math.round(cw * Math.min(RENDER_SCALE * dpr, MAX_DPR)));
      let bh = Math.max(1, Math.round(ch * Math.min(RENDER_SCALE * dpr, MAX_DPR)));
      const over = (bw * bh) / PIXEL_BUDGET;
      if (over > 1) {
        const s = Math.sqrt(1 / over);
        bw = Math.max(1, Math.round(bw * s));
        bh = Math.max(1, Math.round(bh * s));
      }
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }

      const present = ptr.inside ? 1 : 0;
      on += (present - on) * (1 - Math.exp(-dt * 4));

      const c1 = color(L.color1, DEFAULTS.color1);
      const c2 = color(L.color2, DEFAULTS.color2);
      const c3 = color(L.color3, DEFAULTS.color3);
      const bg = color(L.background, DEFAULTS.background);

      gl.viewport(0, 0, bw, bh);
      gl.useProgram(prog);
      gl.uniform2f(u.res, bw, bh);
      gl.uniform1f(u.time, clock);
      gl.uniform1f(u.speed, L.speed);
      gl.uniform2f(u.mouse, (ptr.tx - cw / 2) / ch, (ch / 2 - ptr.ty) / ch);
      gl.uniform1f(u.on, on * L.intensity);
      gl.uniform3f(u.c1, c1[0], c1[1], c1[2]);
      gl.uniform3f(u.c2, c2[0], c2[1], c2[2]);
      gl.uniform3f(u.c3, c3[0], c3[1], c3[2]);
      gl.uniform3f(u.bg, bg[0], bg[1], bg[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      pointer.dispose();
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default AuroraFlow;