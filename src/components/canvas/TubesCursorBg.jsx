import { useEffect, useRef } from "react";

const TUBE_COLORS = ["#f967fb", "#53bc28", "#6958d5"];
const LIGHT_COLORS = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"];

const rand = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

const TubesCursorBg = ({ intensity = 200, interactive = true }) => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let app;

    import("threejs-components/build/cursors/tubes1.min.js")
      .then((mod) => {
        if (disposed) return;
        const TubesCursor = mod?.default ?? mod;
        const canvas = canvasRef.current;
        if (!canvas || typeof TubesCursor !== "function") return;
        app = TubesCursor(canvas, {
          tubes: {
            colors: TUBE_COLORS,
            lights: { intensity, colors: LIGHT_COLORS },
          },
        });
        appRef.current = app;
      })
      .catch((err) => console.error("TubesCursorBg init failed:", err));

    const onClick = () => {
      const a = appRef.current;
      if (!a) return;
      a.tubes?.setColors([rand(), rand(), rand()]);
      a.tubes?.setLightsColors([rand(), rand(), rand(), rand()]);
    };

    const el = rootRef.current;
    if (interactive) el?.addEventListener("click", onClick);

    return () => {
      disposed = true;
      el?.removeEventListener("click", onClick);
      if (app && typeof app.dispose === "function") app.dispose();
      appRef.current = null;
    };
  }, [intensity, interactive]);

  return (
    <div ref={rootRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default TubesCursorBg;