import { useId } from "react";

const BrandMark = ({ className = "" }) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const frameGradient = `brand-frame-${id}`;
  const markGradient = `brand-mark-${id}`;

  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id={frameGradient} x1="5" y1="7" x2="43" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset=".48" stopColor="#e879f9" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={markGradient} x1="14" y1="14" x2="36" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0abfc" />
            <stop offset=".52" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#67e8f9" />
          </linearGradient>
        </defs>

        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="13"
          fill="#0c0a18"
          stroke={`url(#${frameGradient})`}
          strokeOpacity=".7"
        />
        <ellipse
          className="brand-mark__orbit"
          cx="24"
          cy="24"
          rx="17"
          ry="8"
          transform="rotate(-38 24 24)"
          stroke={`url(#${frameGradient})`}
          strokeWidth="1.2"
          strokeDasharray="22 11"
          opacity=".9"
        />
        <path
          d="M17 33V15h8a6 6 0 0 1 0 12h-8m8 0 8 6"
          stroke={`url(#${markGradient})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="brand-mark__spark" cx="37.5" cy="13.5" r="2.1" fill="#67e8f9" />
      </svg>
    </span>
  );
};

export default BrandMark;
