/** Shared SVG pine primitives — lineless editorial style. */

export function SpindlePine({
  x = 0,
  scale = 1,
  opacity = 1,
}: {
  x?: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`} opacity={opacity}>
      <rect x={-1.1} y={78} width={2.2} height={34} fill="currentColor" />
      <path
        d="M0 78 L-12 92 L0 66 L12 92 Z M0 68 L-10 82 L0 52 L10 82 Z M0 54 L-8 68 L0 38 L8 68 Z M0 40 L-6 52 L0 24 L6 52 Z M0 26 L-4 36 L0 10 L4 36 Z"
        fill="currentColor"
      />
    </g>
  );
}

export function RoundCanopy({
  x,
  y,
  r,
  opacity = 1,
}: {
  x: number;
  y: number;
  r: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill="currentColor" />
      <circle cx={x - r * 0.55} cy={y + r * 0.2} r={r * 0.72} fill="currentColor" />
      <circle cx={x + r * 0.5} cy={y + r * 0.15} r={r * 0.66} fill="currentColor" />
      <rect x={x - 1.2} y={y + r * 0.35} width={2.4} height={r * 1.4} fill="currentColor" />
    </g>
  );
}

export function MistBand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <ellipse cx="60" cy="22" rx="70" ry="10" fill="currentColor" opacity="0.35" />
      <ellipse cx="180" cy="18" rx="90" ry="12" fill="currentColor" opacity="0.45" />
      <ellipse cx="310" cy="24" rx="80" ry="11" fill="currentColor" opacity="0.32" />
      <ellipse cx="200" cy="28" rx="140" ry="8" fill="currentColor" opacity="0.22" />
    </svg>
  );
}

export function WindowGlow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="32" height="40" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="8" y="10" width="24" height="28" fill="#F0C56D" opacity="0.85" />
      <path d="M20 10 V38 M8 24 H32" stroke="#241F1A" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function DenseForestColumn({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? -1 : 1;
  return (
    <svg
      viewBox="0 0 90 200"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <g transform={`translate(45 6) scale(${flip} 1) translate(-45 0)`}>
        <g className="forest-layer forest-layer-back">
          <SpindlePine x={8} scale={0.7} opacity={0.28} />
          <SpindlePine x={28} scale={0.95} opacity={0.34} />
          <SpindlePine x={48} scale={0.8} opacity={0.3} />
          <SpindlePine x={68} scale={1.05} opacity={0.36} />
          <RoundCanopy x={18} y={130} r={12} opacity={0.22} />
          <RoundCanopy x={58} y={140} r={10} opacity={0.2} />
        </g>
        <g className="forest-layer forest-layer-mid">
          <SpindlePine x={14} scale={1.05} opacity={0.45} />
          <SpindlePine x={36} scale={1.25} opacity={0.52} />
          <SpindlePine x={56} scale={0.95} opacity={0.42} />
          <SpindlePine x={76} scale={1.15} opacity={0.48} />
          <RoundCanopy x={10} y={150} r={14} opacity={0.35} />
          <RoundCanopy x={50} y={158} r={11} opacity={0.32} />
        </g>
        <g className="forest-layer forest-layer-front">
          <SpindlePine x={22} scale={1.35} opacity={0.62} />
          <SpindlePine x={44} scale={1.5} opacity={0.7} />
          <SpindlePine x={66} scale={1.2} opacity={0.58} />
          <RoundCanopy x={6} y={168} r={16} opacity={0.48} />
          <RoundCanopy x={40} y={174} r={12} opacity={0.42} />
          <ellipse cx="45" cy="192" rx="42" ry="9" fill="currentColor" opacity="0.2" />
        </g>
      </g>
    </svg>
  );
}
