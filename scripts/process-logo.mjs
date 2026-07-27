import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input =
  "C:/Users/hp/.cursor/projects/c-Users-hp-Music-moveicam/assets/c__Users_hp_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-74ebc8a3-17ac-483e-8691-5a4876300984.png";
const output = path.resolve(__dirname, "../public/logo.webp");

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
    const avg = (r + g + b) / 3;

    const isBackground =
      (r > 230 && g > 230 && b > 230) ||
      (avg > 210 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12);

    const isEdgeArtifact =
      avg < 45 &&
      Math.abs(r - g) < 8 &&
      Math.abs(g - b) < 8 &&
      (x < 3 || y < 3 || x > width - 4 || y > height - 4);

    if (isBackground || isEdgeArtifact) {
      pixels[i + 3] = 0;
    }
  }
}

await sharp(pixels, { raw: { width, height, channels } })
  .trim({ threshold: 12 })
  .webp({ quality: 90, effort: 4 })
  .toFile(output);

console.log(`Logo saved: ${output}`);
