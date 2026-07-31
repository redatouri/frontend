"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/layout/CartDrawer").then((m) => ({ default: m.CartDrawer })),
  { ssr: false },
);

const WishlistDrawer = dynamic(
  () =>
    import("@/components/layout/WishlistDrawer").then((m) => ({ default: m.WishlistDrawer })),
  { ssr: false },
);

export function LazyDrawers() {
  return (
    <>
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
