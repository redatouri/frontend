import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/social");

const jobs = [
  {
    input:
      "C:/Users/hp/.cursor/projects/c-Users-hp-Music-moveicam/assets/c__Users_hp_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-2ae2c49e-0afb-4adb-858b-140ccbea2415.png",
    output: path.join(outDir, "facebook.webp"),
    mode: "light",
  },
  {
    input:
      "C:/Users/hp/.cursor/projects/c-Users-hp-Music-moveicam/assets/c__Users_hp_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-6e4fc910-31b2-4bcd-87cd-723ab264e671.png",
    output: path.join(outDir, "instagram.webp"),
    mode: "dark",
  },
];

function shouldRemovePixel(r, g, b, mode) {
  const avg = (r + g + b) / 3;

  if (mode === "dark") {
    return avg < 45;
  }

  const isLight =
    (r > 210 && g > 210 && b > 210) ||
    (avg > 175 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18);

  const isEdgeArtifact =
    avg < 45 &&
    Math.abs(r - g) < 8 &&
    Math.abs(g - b) < 8;

  return isLight || isEdgeArtifact;
}

async function processIcon({ input, output, mode }) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  const { width, height, channels } = info;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      if (shouldRemovePixel(r, g, b, mode)) {
        pixels[i + 3] = 0;
      }
    }
  }

  await sharp(pixels, { raw: { width, height, channels } })
    .trim({ threshold: 12 })
    .resize(88, 88, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 4, alphaQuality: 100 })
    .toFile(output);

  console.log(`Saved: ${output}`);
}

for (const job of jobs) {
  await processIcon(job);
}
