import Image from "next/image";
import { cabin } from "@/data/cabin";

export function DriveTimeList() {
  return (
    <ul className="mt-10 space-y-4 border-t border-white/10 pt-8">
      {cabin.driveTimes.map((item) => (
        <li
          key={item.place}
          className="group relative flex items-center justify-between gap-4 text-sm text-white/85"
        >
          <span className="cursor-default transition-colors group-hover:text-parchment">
            {item.place}
          </span>
          <span className="text-white/45">{item.time}</span>

          <div
            className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 group-focus-within:opacity-100"
            aria-hidden="true"
          >
            <div className="drive-pin shadow-lg">
              <div className="drive-pin-face">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={72}
                  height={72}
                  className="drive-pin-image h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
