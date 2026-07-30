import { getBackendApiCandidates } from "@/lib/api/backend-url";
import { NextRequest, NextResponse } from "next/server";

async function proxyRequest(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const search = req.nextUrl.search;
  const suffix = `/api/v1/${path}${search}`;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }
  const authorization = req.headers.get("authorization");
  if (authorization) {
    headers.set("Authorization", authorization);
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const candidates = getBackendApiCandidates();
  const errors: string[] = [];

  for (const base of candidates) {
    const url = `${base}${suffix}`;
    try {
      const res = await fetch(url, init);
      const body = await res.text();

      if (res.status >= 500 && res.status !== 502) {
        errors.push(`${base}: HTTP ${res.status}`);
        continue;
      }

      return new NextResponse(body, {
        status: res.status,
        headers: {
          "Content-Type": res.headers.get("Content-Type") ?? "application/json",
          "X-Moviecam-Api-Base": base,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "fetch failed";
      errors.push(`${base}: ${message}`);
      console.error("Admin proxy attempt failed:", url, error);
    }
  }

  return NextResponse.json(
    {
      detail: {
        message:
          "L'API backend est hors ligne. Ouvrez Easypanel → backend → Logs. Vérifiez DATABASE_URL et que PostgreSQL tourne.",
        code: "API_UNREACHABLE",
        tried: candidates,
        errors,
      },
    },
    { status: 502 },
  );
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, (await context.params).path);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, (await context.params).path);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, (await context.params).path);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, (await context.params).path);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, (await context.params).path);
}
