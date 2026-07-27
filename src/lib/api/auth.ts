import { api } from "./client";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<AuthTokens> {
  return api<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
}

export async function getMe(token: string): Promise<AdminUser> {
  const { apiAuth } = await import("./client");
  return apiAuth<AdminUser>("/auth/me", token);
}
