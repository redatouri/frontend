import type { ProductDetail, ProductListItem, ProductListResponse } from "@/types/product";

function item(
  id: string,
  slug: string,
  name: string,
  headline: string,
  price: number,
  category?: { slug: string; name: string },
  primaryImage?: string,
  compareAt?: number,
  stock = 6,
): ProductListItem {
  return {
    id,
    slug,
    name,
    headline,
    subheadline: "Équipement professionnel, original et garanti.",
    rating: 4.8,
    review_count: 42,
    primary_image: primaryImage ?? null,
    default_offer: {
      id: `${id}-offer`,
      label: "Standard",
      price,
      compare_at_price: compareAt ?? null,
      stock,
      is_default: true,
    },
    category,
  };
}

const OSMO_POCKET_IMAGES = [
  "/products/dji-osmo-pocket-3-standard-0.webp",
  "/products/dji-osmo-pocket-3-standard-1.webp",
  "/products/dji-osmo-pocket-3-standard-2.webp",
  "/products/dji-osmo-pocket-3-standard-3.webp",
];

const OSMO_POCKET_CREATOR_IMAGES = [
  "/products/dji-osmo-pocket-3-creator-combo-0.webp",
  "/products/dji-osmo-pocket-3-creator-combo-1.webp",
  "/products/dji-osmo-pocket-3-creator-combo-2.webp",
  "/products/dji-osmo-pocket-3-creator-combo-3.webp",
];

const OSMO_POCKET_CREATOR_DESCRIPTION =
  "Stabilisation 3 axes, vidéo 4K60 et écran tactile rotatif. Le Creator Combo inclut trépied, micro externe et accessoires pour un tournage flexible.";

const OSMO_POCKET_CREATOR_SPECS = [
  {
    key: "Stabilité et Performance Vidéo",
    value:
      "Tout d'abord, le DJI Osmo Pocket 3 est équipé d'une stabilisation à 3 axes qui assure des vidéos fluides et sans secousses, même en mouvement. Avec une résolution vidéo 4K à 60 images par seconde, il garantit des images d'une clarté et d'une fluidité impressionnantes. Par conséquent, vos vidéos auront un rendu professionnel, que vous soyez en déplacement ou en action.",
  },
  {
    key: "Écran Tactile Intuitif",
    value:
      "De plus, ce modèle dispose d'un écran tactile intégré qui facilite la navigation et les réglages. Grâce à cet écran, vous pouvez prévisualiser vos prises de vue, ajuster les paramètres et consulter vos vidéos rapidement et facilement. L'interface utilisateur intuitive améliore l'expérience globale et permet une utilisation simplifiée.",
  },
  {
    key: "Accessoires Inclus pour Plus de Flexibilité",
    value:
      "Le Creator Combo comprend plusieurs accessoires qui augmentent la flexibilité et les possibilités de création. Parmi ces accessoires, on trouve un trépied, un micro externe, et un contrôle à distance. Ces outils vous permettent de réaliser des prises de vue variées et de capturer un son de qualité supérieure, tout en ayant une grande liberté de mouvement.",
  },
];

const OSMO_NANO_IMAGES = ["/products/dji-osmo-nano-128gb-0.webp"];

const OSMO_NANO_SPECS = [
  { key: "Capteur", value: "1/1.3″ CMOS haute performance" },
  { key: "Résolution vidéo max.", value: "4K (3840 x 2160) jusqu'à 60 fps" },
  { key: "Plage dynamique", value: "13,5 stops" },
  { key: "Stockage intégré", value: "128 Go" },
  { key: "Modes d'enregistrement", value: "Normal, Pré-enregistrement, Boucle, Auto, Nod/Pat" },
  { key: "Stabilisation", value: "EIS : RockSteady / HorizonBalancing / Off" },
  { key: "Ouverture", value: "f/2.8 (ultra grand-angle 143°)" },
  { key: "Profil couleur", value: "D-Log M, 10-bit" },
  { key: "Écran Vision Dock", value: "OLED tactile 1,96″" },
  { key: "Connectivité", value: "Wi-Fi, USB 3.1, microSD (export)" },
  { key: "Autonomie", value: "Jusqu'à 200 min (dock), 90 min (caméra seule)" },
  { key: "Charge rapide", value: "80 % en 20 minutes" },
  { key: "Étanchéité", value: "Caméra : 10 m / Dock : IPX4" },
  { key: "Audio", value: "2 micros stéréo intégrés, compatible DJI OsmoAudio" },
  { key: "Poids", value: "Caméra : 35 g / Dock : 82 g" },
  { key: "App compatible", value: "DJI Mimo (Android / iOS)" },
  {
    key: "Accessoires inclus",
    value: "Lanière magnétique, clip casquette, support ventouse, étui de protection",
  },
];

const DJI_MIC_MINI_2_IMAGES = [
  "/products/dji-mic-mini-2-combo-0.webp",
  "/products/dji-mic-mini-2-combo-1.webp",
  "/products/dji-mic-mini-2-combo-2.webp",
  "/products/dji-mic-mini-2-combo-3.webp",
];

const DJI_RS4_MINI_IMAGES = [
  "/products/dji-rs4-mini-0.webp",
  "/products/dji-rs4-mini-1.webp",
  "/products/dji-rs4-mini-2.webp",
];

const DJI_RS4_MINI_SPECS = [
  { key: "Type de stabilisateur", value: "Pliable" },
  { key: "Charge maximale", value: "2 kg" },
  { key: "Poids", value: "890 g (hors trépied)" },
  { key: "Dimensions", value: "25,6 x 25,6 x 38,1 cm" },
  { key: "Autonomie", value: "Jusqu'à 13 heures" },
  { key: "Temps de recharge", value: "1h50 (rapide)" },
  { key: "Alimentation", value: "Batterie non amovible" },
  { key: "Connectique", value: "2 ports USB-C" },
  { key: "Communication", value: "Bluetooth" },
  { key: "Compatibilité caméras", value: "Hybrides, smartphone (support requis)" },
  { key: "Écran intégré", value: "1,4 pouces" },
  { key: "Origine", value: "Fabriqué hors Europe" },
];

const DJI_OSMO_MOBILE_7P_IMAGES = [
  "/products/dji-osmo-mobile-7p-0.webp",
  "/products/dji-osmo-mobile-7p-1.webp",
];

const DJI_RS5_IMAGES = [
  "/products/dji-rs5-0.webp",
  "/products/dji-rs5-1.webp",
  "/products/dji-rs5-2.webp",
];

const DJI_OSMO_MOBILE_7_IMAGES = [
  "/products/dji-osmo-mobile-7-0.webp",
  "/products/dji-osmo-mobile-7-1.webp",
  "/products/dji-osmo-mobile-7-2.webp",
  "/products/dji-osmo-mobile-7-3.webp",
  "/products/dji-osmo-mobile-7-4.webp",
];

const DJI_OSMO_MOBILE_8_IMAGES = [
  "/products/dji-osmo-mobile-8-0.webp",
  "/products/dji-osmo-mobile-8-1.webp",
  "/products/dji-osmo-mobile-8-2.webp",
];

const DJI_ACTION_6_IMAGES = [
  "/products/dji-action-6-standard-0.webp",
  "/products/dji-action-6-standard-1.webp",
  "/products/dji-action-6-standard-2.webp",
];

const DJI_ACTION_6_ADVENTURE_IMAGES = [
  "/products/dji-action-6-adventure-combo-0.webp",
  "/products/dji-action-6-adventure-combo-1.webp",
  "/products/dji-action-6-adventure-combo-2.webp",
];

const DEMO_PRODUCT_IMAGES: Record<string, string[]> = {
  "dji-osmo-pocket-3-standard": OSMO_POCKET_IMAGES,
  "dji-osmo-pocket-3-creator-combo": OSMO_POCKET_CREATOR_IMAGES,
  "dji-osmo-nano-128gb": OSMO_NANO_IMAGES,
  "dji-action-6-standard": DJI_ACTION_6_IMAGES,
  "dji-action-6-adventure-combo": DJI_ACTION_6_ADVENTURE_IMAGES,
  "dji-mic-mini-2-combo": DJI_MIC_MINI_2_IMAGES,
  "dji-rs4-mini": DJI_RS4_MINI_IMAGES,
  "dji-rs5": DJI_RS5_IMAGES,
  "dji-osmo-mobile-7": DJI_OSMO_MOBILE_7_IMAGES,
  "dji-osmo-mobile-7p": DJI_OSMO_MOBILE_7P_IMAGES,
  "dji-osmo-mobile-8": DJI_OSMO_MOBILE_8_IMAGES,
};

const DEMO_PRODUCT_SPECS: Record<string, { key: string; value: string }[]> = {
  "dji-rs4-mini": DJI_RS4_MINI_SPECS,
  "dji-osmo-nano-128gb": OSMO_NANO_SPECS,
  "dji-osmo-pocket-3-creator-combo": OSMO_POCKET_CREATOR_SPECS,
};

const DEMO_PRODUCT_DESCRIPTIONS: Record<string, string> = {
  "dji-osmo-pocket-3-creator-combo": OSMO_POCKET_CREATOR_DESCRIPTION,
};

const DEMO_ITEMS: ProductListItem[] = [
  item("1", "sony-a7iv", "Sony A7 IV", "Capturez en 4K 60fps sans compromis", 24999, { slug: "cameras-mirrorless", name: "Hybrides" }, undefined, 29999),
  item("14", "dji-mic-mini-2-combo", "Dji mic mini 2 (2tx + 1 rx + charging case)", "Dji mic mini 2 (2tx + 1 rx + charging case)", 1400, { slug: "audio-wireless", name: "Sans fil" }, DJI_MIC_MINI_2_IMAGES[0]),
  item("3", "rod-videomic-pro-plus", "Rode VideoMic Pro+", "Le micro canon préféré des vidéastes", 2799, { slug: "audio-microphones-shotgun", name: "Micros canon" }),
  item("15", "dji-rs4-mini", "Dji rs4 mini", "Dji rs4 mini", 3400, { slug: "stabilization-gimbals", name: "Gimbals" }, DJI_RS4_MINI_IMAGES[0]),
  item("17", "dji-rs5", "Dji rs5", "Dji rs5", 6100, { slug: "stabilization-gimbals", name: "Gimbals" }, DJI_RS5_IMAGES[0]),
  item("18", "dji-osmo-mobile-7", "Dji osmo mobile 7", "Dji osmo mobile 7", 950, { slug: "stabilization-gimbals", name: "Gimbals" }, DJI_OSMO_MOBILE_7_IMAGES[0]),
  item("16", "dji-osmo-mobile-7p", "Dji osmo mobile 7p", "Dji osmo mobile 7p", 1400, { slug: "stabilization-gimbals", name: "Gimbals" }, DJI_OSMO_MOBILE_7P_IMAGES[0]),
  item("19", "dji-osmo-mobile-8", "Dji osmo mobile 8", "Dji osmo mobile 8", 1800, { slug: "stabilization-gimbals", name: "Gimbals" }, DJI_OSMO_MOBILE_8_IMAGES[0]),
  item("5", "dji-osmo-pocket-3-standard", "Dji osmo pocket 3 standard", "Dji osmo pocket 3 standard", 4500, { slug: "action-cameras", name: "Caméras action" }, OSMO_POCKET_IMAGES[0]),
  item("12", "dji-osmo-pocket-3-creator-combo", "Dji osmo pocket 3 creator combo", "Dji osmo pocket 3 creator combo", 6200, { slug: "action-cameras", name: "Caméras action" }, OSMO_POCKET_CREATOR_IMAGES[0]),
  item("13", "dji-osmo-nano-128gb", "Dji osmo nano 128gb", "Dji osmo nano 128gb", 4200, { slug: "action-cameras", name: "Caméras action" }, OSMO_NANO_IMAGES[0]),
  item("20", "dji-action-6-standard", "Dji action 6 standard", "Dji action 6 standard", 4800, { slug: "action-cameras", name: "Caméras action" }, DJI_ACTION_6_IMAGES[0]),
  item("21", "dji-action-6-adventure-combo", "Dji osmo action 6 adventure combo", "Dji osmo action 6 adventure combo", 5900, { slug: "action-cameras", name: "Caméras action" }, DJI_ACTION_6_ADVENTURE_IMAGES[0]),
  item("6", "aputure-600d-pro", "Aputure 600d Pro", "Éclairage daylight 600W pour tournage pro", 12499, { slug: "lighting-led-panels", name: "Panneaux LED" }),
  item("7", "sandisk-extreme-pro-256", "SanDisk Extreme PRO 256GB", "V90 — jamais de dropped frames", 899, { slug: "memory-sd-cf", name: "Cartes SD & CF" }),
  item("8", "sony-np-fz100-twin", "Sony NP-FZ100 (x2)", "Autonomie double pour longues journées de tournage", 649, { slug: "batteries-camera", name: "Batteries caméra" }),
  item("9", "smallrig-cage-a7iv", "SmallRig Cage Sony A7 IV", "Rig complet prêt à tourner", 899, { slug: "stabilization-rigs", name: "Cages & Rigs" }),
  item("10", "pack-podcast-starter", "Pack Podcast Starter", "Lancez votre podcast en un clic", 2999, { slug: "studio-packs-podcast", name: "Packs Podcast" }, undefined, 3499),
  item("11", "gopro-hero-13-black", "GoPro HERO 13 Black", "Action 5.3K — compact et indestructible", 3799, { slug: "action-cameras", name: "Caméras action" }),
];

export function getDemoProducts(params: {
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): ProductListResponse {
  let items = [...DEMO_ITEMS];

  if (params.category) {
    items = items.filter(
      (product) =>
        product.category?.slug === params.category ||
        product.category?.slug.startsWith(params.category!),
    );
  }

  if (params.featured) {
    items = items.slice(0, 6);
  }

  const page = params.page ?? 1;
  const limit = Math.min(params.limit ?? 20, 50);
  const start = (page - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    total: items.length,
    page,
    limit,
  };
}

export function getDemoProduct(slug: string): ProductDetail | null {
  const product = DEMO_ITEMS.find((entry) => entry.slug === slug);
  if (!product) return null;

  const gallery = DEMO_PRODUCT_IMAGES[product.slug];
  const images = gallery
    ? gallery.map((url, sort_order) => ({
        url,
        alt_text: product.name,
        sort_order,
        is_lifestyle: sort_order === gallery.length - 1,
      }))
    : product.primary_image
      ? [{ url: product.primary_image, alt_text: product.name, sort_order: 0 }]
      : [];

  return {
    ...product,
    description:
      DEMO_PRODUCT_DESCRIPTIONS[product.slug] ??
      `${product.headline}. Pensé pour les créateurs exigeants au Maroc.`,
    images,
    offers: [product.default_offer],
    specs: DEMO_PRODUCT_SPECS[product.slug] ?? [{ key: "Garantie", value: "Garantie constructeur" }],
    cross_sells: DEMO_ITEMS.filter((entry) => entry.slug !== slug).slice(0, 3),
  };
}

export function isDemoModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true";
}
