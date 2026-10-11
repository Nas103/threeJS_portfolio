import { useEffect, useRef, useState } from "react";

const KeepAlive = ({ children, placeholder = null, margin = 100, className = "w-full h-full" }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: `${margin}px 0px` }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return <div ref={ref} className={className}>{inView ? children : placeholder}</div>;
};

export default KeepAlive;