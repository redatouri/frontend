export function GoogleMapEmbed() {
  const lat = process.env.NEXT_PUBLIC_STORE_LAT ?? "33.5731";
  const lng = process.env.NEXT_PUBLIC_STORE_LNG ?? "-7.5898";
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!key) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-border bg-bg-elevated text-text-secondary">
        <p className="text-sm">Carte — configurez NEXT_PUBLIC_GOOGLE_MAPS_KEY</p>
      </div>
    );
  }

  return (
    <iframe
      title="Moviecam store location"
      src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=15`}
      className="h-[400px] w-full rounded-lg border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
