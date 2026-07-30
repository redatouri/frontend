export function getBackendApiCandidates(): string[] {
  const candidates = [
    process.env.API_URL,
    process.env.INTERNAL_API_URL,
    "http://moviecam_backend:8000",
    "http://backend:8000",
    process.env.NEXT_PUBLIC_API_URL,
    "https://api.moviecam.ma",
  ]
    .filter(Boolean)
    .map((value) => value!.replace(/\/$/, ""));

  return [...new Set(candidates)];
}

export function getBackendApiBase(): string {
  return getBackendApiCandidates()[0] ?? "https://api.moviecam.ma";
}
