"use client";

export function EmailGaryButton() {
  function handleClick() {
    // Fire Meta Pixel Lead event when user clicks to email the agent
    if (
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (window as any).fbq === "function"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).fbq("track", "Lead");
    }
    // Fire Google Ads conversion event
    if (
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (window as any).gtag === "function"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "conversion", {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/lead`,
      });
    }
  }

  return (
    <a
      href="mailto:gary.doss@compass.com?subject=Inquiry%20—%20399%20Rainier%20Road%2C%20Lake%20Arrowhead"
      onClick={handleClick}
      className="bg-accent text-white px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-colors"
    >
      Email Gary
    </a>
  );
}
