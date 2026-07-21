import { DriveTimeList } from "@/components/drive-time-list";

type IllustratedMapProps = {
  title?: string;
  description?: string;
};

/**
 * Preserves map/location interactions; supplies atmospheric landscape framing.
 */
export function IllustratedMap({
  title = "In the pines of Arrowhead Woods",
  description = "Ninety minutes from Los Angeles. Five minutes to Lake Arrowhead Village. Owner lake trails when registered. Beach clubs are not included for short-term guests.",
}: IllustratedMapProps) {
  return (
    <div className="illustrated-map">
      <div className="illustrated-map-panel">
        <div className="illustrated-map-copy">
          <h2 className="font-serif illustrated-map-title">{title}</h2>
          <p className="illustrated-map-body">{description}</p>
          <DriveTimeList />
        </div>
        <div className="illustrated-map-frame">
          <iframe
            title="Lake Arrowhead map"
            src="https://maps.google.com/maps?q=Arrowhead+Woods,+Lake+Arrowhead,+CA&z=13&output=embed"
            className="illustrated-map-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
