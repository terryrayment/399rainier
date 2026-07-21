/**
 * Subtle non-fixed underlay — paper mist only.
 * Dense forests are owned by ForestScene so fixed walls don’t stamp full-page captures
 * or pile on mobile content.
 */
export function IllustratedWorld() {
  return (
    <div className="illustrated-world illustrated-world--underlay" aria-hidden="true">
      <div className="world-mist-band world-mist-band--1 forest-layer forest-layer--mist" />
      <div className="world-mist-band world-mist-band--2 forest-layer forest-layer--mist" />
    </div>
  );
}
