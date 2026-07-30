export function getBackendApiBase(): string {
  const configured =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "https://api.moviecam.ma";

  return configured.replace(/\/$/, "");
}
