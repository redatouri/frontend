export const STORE = {
  name: "Movie Cam",
  phones: [
    { display: "+212 661-631034", tel: "+212661631034" },
    { display: "+212 706-063502", tel: "+212706063502" },
  ],
  phone: "+212 661-631034",
  phoneTel: "+212661631034",
  email: "support@moviecam.ma",
  whatsapp: "212706063502",
  whatsappDisplay: "+212 706-063502",
  lat: 30.3609346,
  lng: -9.5365017,
  mapsUrl: "https://maps.app.goo.gl/1awcRWQ3WJKMvHeL9",
  instagramUrl: "https://www.instagram.com/movie_camshop",
  instagramHandle: "@movie_camshop",
  facebookUrl: "https://www.facebook.com/p/Movie-Cam-100076348809811",
} as const;

export function getStoreCoordinates() {
  const lat = Number(process.env.NEXT_PUBLIC_STORE_LAT ?? STORE.lat);
  const lng = Number(process.env.NEXT_PUBLIC_STORE_LNG ?? STORE.lng);
  return { lat, lng };
}
