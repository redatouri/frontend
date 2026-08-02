import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/seo";

export const alt = `${BRAND.name} — Camera Store Morocco`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logoSrc: string | null = null;
  try {
    const logoData = await readFile(join(process.cwd(), "public/icon-logo.png"));
    logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0891b2 100%)",
          padding: 48,
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt="" width={120} height={120} style={{ borderRadius: "50%" }} />
        ) : null}
        <div
          style={{
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {BRAND.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#e2e8f0",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Camera Store Morocco · DJI · Sony · Canon
        </div>
        <div style={{ marginTop: 12, fontSize: 24, color: "#67e8f9" }}>moviecam.ma</div>
      </div>
    ),
    { ...size },
  );
}
