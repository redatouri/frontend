"use client";

import { useAuthStore } from "@/lib/stores/auth";
import { cn } from "@/lib/utils";
import { LogOut, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV = [
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingBag },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, hasHydrated, clearTokens } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!accessToken && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [accessToken, hasHydrated, pathname, router]);

  if (pathname === "/admin/login") {
    return children;
  }

  if (!hasHydrated || !accessToken) {
    return null;
  }

  const logout = () => {
    clearTokens();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Movie Cam"
                width={120}
                height={40}
                className="h-9 w-auto shrink-0 object-contain"
              />
              <div>
                <p className="font-semibold text-zinc-900">Moviecam Admin</p>
                <p className="text-xs text-zinc-500">Gestion boutique</p>
              </div>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                    pathname.startsWith(href)
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
          >
            <LogOut className="size-4" />
            Déconnexion
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
