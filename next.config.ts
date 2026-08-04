import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "sonner", "lenis"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "api.moviecam.ma" },
      { protocol: "http", hostname: "localhost", port: "8000" },
    ],
  },
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      {
        source: "/home/:path*",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/logo.webp",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/:path*\\.(webp|avif|png|jpg|jpeg|svg|ico|woff2|mp4)",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
