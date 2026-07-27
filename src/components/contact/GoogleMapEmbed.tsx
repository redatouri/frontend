import { getStoreCoordinates } from "@/lib/store";

export function GoogleMapEmbed() {
  const { lat, lng } = getStoreCoordinates();
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const embedSrc = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=15`
    : `https://maps.google.com/maps?q=${lat},${lng}&hl=fr&z=15&output=embed`;

  return (
    <iframe
      title="Movie Cam store location"
      src={embedSrc}
      className="h-[400px] w-full rounded-lg border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
