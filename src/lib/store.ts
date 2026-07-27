export const STORE = {
  name: "Movie Cam",
  phone: "0630960711",
  phoneTel: "+212630960711",
  lat: 30.3609346,
  lng: -9.5365017,
  mapsUrl: "https://maps.app.goo.gl/1awcRWQ3WJKMvHeL9",
} as const;

export function getStoreCoordinates() {
  const lat = Number(process.env.NEXT_PUBLIC_STORE_LAT ?? STORE.lat);
  const lng = Number(process.env.NEXT_PUBLIC_STORE_LNG ?? STORE.lng);
  return { lat, lng };
}
