import { ApiError } from "./client";

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
}

async function parseJsonResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let body: { detail?: unknown; code?: string; message?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res, body);
  }

  return res.json() as Promise<T>;
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<AuthTokens> {
  const res = await fetch("/api/admin-proxy/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  return parseJsonResponse<AuthTokens>(res);
}

export async function getMe(token: string): Promise<AdminUser> {
  const res = await fetch("/api/admin-proxy/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return parseJsonResponse<AdminUser>(res);
}
