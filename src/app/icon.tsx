import { generateAppIcon } from "@/lib/generate-app-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return generateAppIcon(32);
}
