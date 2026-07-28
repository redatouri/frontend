export class ApiError extends Error {
  status: number;
  code?: string;
  detail?: unknown;

  constructor(res: Response, body?: { detail?: string; code?: string }) {
    super(body?.detail ?? `API error ${res.status}`);
    this.name = "ApiError";
    this.status = res.status;
    this.code = body?.code;
    this.detail = body;
  }
}

function getApiBase(): string {
  const configured =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "https://api.moviecam.ma";

  const normalized = configured.replace(/\/$/, "");

  if (
    process.env.NODE_ENV === "production" &&
    /localhost|127\.0\.0\.1/.test(normalized)
  ) {
    return "https://api.moviecam.ma";
  }

  return normalized;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const isServer = typeof window === "undefined";
  const res = await fetch(`${getApiBase()}/api/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...(isServer && !options?.cache?.toString().includes("no-store")
      ? { next: options?.next ?? { revalidate: 60 } }
      : {}),
  });

  if (!res.ok) {
    let body: { detail?: string; code?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res, body);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export async function apiAuth<T>(
  path: string,
  token: string,
  options?: RequestInit,
): Promise<T> {
  return api<T>(path, {
    ...options,
    cache: "no-store",
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
