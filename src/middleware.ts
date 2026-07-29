import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(fr|ar|en)/:path*",
    "/((?!api|admin|_next|icon|apple-icon|.*\\..*).*)",
  ],
};
