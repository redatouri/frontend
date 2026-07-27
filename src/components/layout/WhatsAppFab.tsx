"use client";

import { getWhatsAppUrl } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { usePathname } from "@/i18n/navigation";

interface WhatsAppFabProps {
  message?: string;
}

export function WhatsAppFab({ message }: WhatsAppFabProps) {
  const pathname = usePathname();
  const isCheckout = pathname.includes("/checkout");

  if (isCheckout) return null;

  return (
    <a
      href={getWhatsAppUrl(message ?? "Bonjour Moviecam, j'ai une question.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 start-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      aria-label="WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
