import { getBackendApiBase } from "@/lib/api/backend-url";
import { NextRequest, NextResponse } from "next/server";

async function proxyRequest(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const search = req.nextUrl.search;
  const url = `${getBackendApiBase()}/api/v1/${path}${search}`;

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

  const res = await fetch(url, init);
  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
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
