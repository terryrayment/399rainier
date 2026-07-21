/** Recurring marks from the heavy site mockup. Triple pine, gold spark, cabin emblem. */

export function GoldSpark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z"
        fill="#F0C56D"
      />
    </svg>
  );
}

export function TriplePine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <path d="M12 36 V28 L6 34 L12 22 L18 34 Z M12 24 L8 28 L12 16 L16 28 Z M12 18 L9.5 21 L12 10 L14.5 21 Z" />
        <path d="M24 38 V28 L16 36 L24 18 L32 36 Z M24 22 L19 28 L24 12 L29 28 Z M24 14 L20.5 18 L24 4 L27.5 18 Z" />
        <path d="M36 36 V28 L30 34 L36 22 L42 34 Z M36 24 L32 28 L36 16 L40 28 Z M36 18 L33.5 21 L36 10 L38.5 21 Z" />
      </g>
    </svg>
  );
}

/** Small lineless A-frame emblem for section breaks */
export function CabinEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 72"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none">
        <path d="M8 62 L40 8 L72 62 Z" fill="#355E45" />
        <path d="M18 62 L40 22 L62 62 Z" fill="#1A1D16" />
        <path d="M28 48 H36 V58 H28 Z" fill="#F0C56D" />
        <path d="M44 48 H52 V58 H44 Z" fill="#F0C56D" />
        <path d="M34 28 H46 V36 H34 Z" fill="#F0C56D" opacity="0.9" />
        <rect x="38" y="6" width="4" height="10" fill="#1A1D16" />
        <path
          d="M40 4 Q44 0 46 6"
          stroke="#A8B89A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* flanking mini pines */}
      <g fill="#1E231F" opacity="0.85">
        <path d="M10 62 V54 L6 58 L10 48 L14 58 Z M10 50 L7.5 53 L10 44 L12.5 53 Z" />
        <path d="M70 62 V54 L66 58 L70 48 L74 58 Z M70 50 L67.5 53 L70 44 L72.5 53 Z" />
      </g>
    </svg>
  );
}

export function SectionMark({ label }: { label?: string }) {
  return (
    <div className="section-mark" aria-hidden={label ? undefined : true}>
      <TriplePine className="section-mark-pines" />
      <GoldSpark className="section-mark-spark" />
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  );
}

export function CabinBreak() {
  return (
    <div className="cabin-break" aria-hidden="true">
      <GoldSpark className="cabin-break-spark" />
      <CabinEmblem className="cabin-break-emblem" />
      <GoldSpark className="cabin-break-spark" />
    </div>
  );
}

export function ForestFloor() {
  return (
    <div className="forest-floor" aria-hidden="true">
      <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M0 160 V70
            C40 40 80 90 120 55
            C160 20 200 75 240 45
            C280 15 320 70 360 40
            C400 10 440 65 480 35
            C520 5 560 60 600 30
            C640 0 680 55 720 28
            C760 5 800 58 840 32
            C880 8 920 62 960 38
            C1000 14 1040 68 1080 42
            C1120 18 1160 70 1200 48
            V160 Z"
          fill="currentColor"
        />
        <ellipse cx="200" cy="120" rx="180" ry="18" fill="currentColor" opacity="0.35" />
        <ellipse cx="700" cy="130" rx="220" ry="16" fill="currentColor" opacity="0.28" />
        <ellipse cx="1000" cy="115" rx="160" ry="14" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}
