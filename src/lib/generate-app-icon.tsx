import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function generateAppIcon(size: number) {
  const logoData = await readFile(join(process.cwd(), "public/icon-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const padding = Math.round(size * 0.12);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={size - padding * 2}
          height={size - padding * 2}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
