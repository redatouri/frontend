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
  label = "Standard",
  reviewCount = 42,
): ProductListItem {
  return {
    id,
    slug,
    name,
    headline,
    subheadline: "Équipement professionnel, original et garanti.",
    rating: 4.8,
    review_count: reviewCount,
    primary_image: primaryImage ?? null,
    default_offer: {
      id: `${id}-offer`,
      label,
      price,
      compare_at_price: compareAt ?? null,
      stock,
      is_default: true,
    },
    category,
  };
}

const SONY_A7IV_IMAGES = ["/products/sony-a7iv-0.png"];
const SONY_FX3_IMAGES = ["/products/sony-fx3-0.png"];
const SONY_A7III_IMAGES = ["/products/sony-a7iii-0.png"];
const SONY_FE_50MM_IMAGES = ["/products/sony-fe-50mm-f18-0.png"];
const SONY_FE_2470_F4_IMAGES = ["/products/sony-fe-24-70-f4-0.png"];
const SONY_FE_2470_GM_IMAGES = ["/products/sony-fe-24-70-f28-gm-0.png"];
const SONY_NP_FZ100_IMAGES = ["/products/sony-np-fz100-0.png"];
const SONY_FX30_IMAGES = ["/products/sony-fx30-0.png"];
const DJI_OSMO_POCKET_4_CREATOR_IMAGES = ["/products/dji-osmo-pocket-4-creator-combo-0.png"];
const DJI_OSMO_POCKET_4_STANDARD_IMAGES = ["/products/dji-osmo-pocket-4-standard-0.png"];
const GODOX_V1_SONY_IMAGES = ["/products/godox-v1-sony-0.png"];
const GODOX_AK_R22_IMAGES = ["/products/godox-ak-r22-0.png"];
const GODOX_LC500R_MINI_IMAGES = ["/products/godox-lc500r-mini-0.png"];
const KF_CONCEPT_ND_IMAGES = ["/products/kf-concept-nano-b-nd2-400-0.png"];
const HOLLYLAND_LARK_M2S_IMAGES = ["/products/hollyland-lark-m2s-0.png"];
const TORCHE_R8_RGB_IMAGES = ["/products/torche-r8-led-rgb-0.png"];
const DESVIEW_P5_II_IMAGES = ["/products/desview-p5-ii-0.png"];
const FEELWORLD_F5_PROX_IMAGES = ["/products/feelworld-f5-prox-0.png"];
const ZOOM_H8_IMAGES = ["/products/zoom-h8-0.png"];
const LEXAR_READER_IMAGES = ["/products/lexar-multi-card-reader-0.png"];
const C_STAND_SUPPORT_IMAGES = ["/products/c-stand-support-0.png"];
const STAND_INOX_IMAGES = ["/products/stand-inox-0.png"];
const FOND_PAPIER_BLEU_IMAGES = ["/products/fond-papier-272-11m-bleu-0.png"];
const FOND_PAPIER_BLANC_IMAGES = ["/products/fond-papier-272-11m-blanc-0.png"];
const FOND_PAPIER_ROUGE_IMAGES = ["/products/fond-papier-272-11m-rouge-0.png"];
const FOND_PAPIER_JAUNE_IMAGES = ["/products/fond-papier-272-11m-jaune-0.png"];
const FOND_PAPIER_NOIR_IMAGES = ["/products/fond-papier-272-11m-noir-0.png"];
const FOND_PAPIER_VERT_IMAGES = ["/products/fond-papier-272-11m-vert-0.png"];
const DEROULEUR_3_FONDS_IMAGES = ["/products/derouleur-fond-mural-3-fonds-0.png"];
const DEROULEUR_4_FONDS_IMAGES = ["/products/derouleur-fond-mural-4-fonds-0.png"];
const MINI_C_STAND_IMAGES = ["/products/mini-c-stand-0.png"];
const LEXAR_128_V90_IMAGES = ["/products/lexar-professional-128-v90-uhs2-0.png"];
const SANDISK_128_V30_IMAGES = ["/products/sandisk-extreme-pro-128-v30-0.png"];
const SANDISK_64_V30_IMAGES = ["/products/sandisk-extreme-pro-64-v30-0.png"];
const SANDISK_SDXC_200_V30_IMAGES = ["/products/sandisk-extreme-pro-sdxc-200-v30-0.png"];
const BOYA_BM6060_IMAGES = ["/products/boya-by-bm6060-0.png"];
const GODOX_IFLASH_IM30_IMAGES = ["/products/godox-iflash-im30-0.png"];
const DJI_RS4_PRO_COMBO_IMAGES = ["/products/dji-rs-4-pro-combo-0.png"];
const DJI_RS4_PRO_IMAGES = ["/products/dji-rs-4-pro-0.png"];
const DJI_RS5_COMBO_IMAGES = ["/products/dji-rs-5-combo-0.png"];
const DJI_RS4_IMAGES = ["/products/dji-rs-4-0.png"];
const DJI_MIC3_2TX_IMAGES = ["/products/dji-mic-3-2tx-1rx-case-0.png"];
const DJI_MIC3_1TX_IMAGES = ["/products/dji-mic-3-1tx-1rx-0.png"];
const SAC_LOLOBO_GRAND_IMAGES = ["/products/sac-lolobo-grand-0.png"];
const SAC_CAMERA_IMAGES = ["/products/sac-camera-0.png"];
const TRIPOD_CANDC_DC999_IMAGES = ["/products/tripod-candc-dc-999-0.png"];
const TRIPOD_CANDC_DC6917_IMAGES = ["/products/tripod-candc-dc-6917-0.png"];
const TRIPOD_CANDC_DC6918_IMAGES = ["/products/tripod-candc-dc-6918-0.png"];
const FEELWORLD_TP10_IMAGES = ["/products/feelworld-tp10-0.png"];
const KODAK_GOLD_200_IMAGES = ["/products/kodak-gold-200-film-bundle-0.png"];
const DEITY_VMIC_D3_PRO_IMAGES = ["/products/deity-v-mic-d3-pro-0.png"];
const RODE_VIDEOMIC_GO_IMAGES = ["/products/rode-videomic-go-0.png"];
const RODE_WIRELESS_GO_II_DUAL_IMAGES = ["/products/rode-wireless-go-ii-dual-0.png"];
const RODE_WIRELESS_GO_II_SINGLE_IMAGES = ["/products/rode-wireless-go-ii-single-0.png"];
const TAMRON_2875_G2_IMAGES = ["/products/tamron-28-75-f28-g2-sony-fe-0.png"];
const FEELWORLD_F7_PLUS_IMAGES = ["/products/feelworld-f7-plus-0.png"];
const ZHIYUN_TORCHE_M20_IMAGES = ["/products/zhiyun-torche-m20-0.png"];
const VRIG_FD140_RGB_IMAGES = ["/products/vrig-fd-140-rgb-0.png"];
const CANON_LC_E6_IMAGES = ["/products/canon-lc-e6-0.png"];
const CANON_LC_E17_IMAGES = ["/products/canon-lc-e17-0.png"];
const CANON_LC_E10_IMAGES = ["/products/canon-lc-e10-0.png"];
const SONY_BC_QZ1_IMAGES = ["/products/sony-bc-qz1-0.png"];
const CANON_LC_E8_IMAGES = ["/products/canon-lc-e8-0.png"];
const PISEN_FZ100_CHARGING_BOX_IMAGES = ["/products/pisen-fz100-charging-box-0.png"];
const SONY_NP_F970_IMAGES = ["/products/sony-np-f970-0.png"];

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
  "sony-a7iv": SONY_A7IV_IMAGES,
  "sony-fx3": SONY_FX3_IMAGES,
  "sony-a7iii": SONY_A7III_IMAGES,
  "sony-fe-50mm-f18": SONY_FE_50MM_IMAGES,
  "sony-fe-24-70-f4": SONY_FE_2470_F4_IMAGES,
  "sony-fe-24-70-f28-gm": SONY_FE_2470_GM_IMAGES,
  "sony-np-fz100": SONY_NP_FZ100_IMAGES,
  "sony-fx30": SONY_FX30_IMAGES,
  "dji-osmo-pocket-4-creator-combo": DJI_OSMO_POCKET_4_CREATOR_IMAGES,
  "dji-osmo-pocket-4-standard": DJI_OSMO_POCKET_4_STANDARD_IMAGES,
  "godox-v1-sony": GODOX_V1_SONY_IMAGES,
  "godox-ak-r22": GODOX_AK_R22_IMAGES,
  "godox-lc500r-mini": GODOX_LC500R_MINI_IMAGES,
  "kf-concept-nano-b-nd2-400": KF_CONCEPT_ND_IMAGES,
  "hollyland-lark-m2s": HOLLYLAND_LARK_M2S_IMAGES,
  "torche-r8-led-rgb": TORCHE_R8_RGB_IMAGES,
  "desview-p5-ii": DESVIEW_P5_II_IMAGES,
  "feelworld-f5-prox": FEELWORLD_F5_PROX_IMAGES,
  "zoom-h8": ZOOM_H8_IMAGES,
  "lexar-multi-card-reader": LEXAR_READER_IMAGES,
  "c-stand-support": C_STAND_SUPPORT_IMAGES,
  "stand-inox": STAND_INOX_IMAGES,
  "fond-papier-272-11m-bleu": FOND_PAPIER_BLEU_IMAGES,
  "fond-papier-272-11m-blanc": FOND_PAPIER_BLANC_IMAGES,
  "fond-papier-272-11m-rouge": FOND_PAPIER_ROUGE_IMAGES,
  "fond-papier-272-11m-jaune": FOND_PAPIER_JAUNE_IMAGES,
  "fond-papier-272-11m-noir": FOND_PAPIER_NOIR_IMAGES,
  "fond-papier-272-11m-vert": FOND_PAPIER_VERT_IMAGES,
  "derouleur-fond-mural-3-fonds": DEROULEUR_3_FONDS_IMAGES,
  "derouleur-fond-mural-4-fonds": DEROULEUR_4_FONDS_IMAGES,
  "mini-c-stand": MINI_C_STAND_IMAGES,
  "lexar-professional-128-v90-uhs2": LEXAR_128_V90_IMAGES,
  "sandisk-extreme-pro-128-v30": SANDISK_128_V30_IMAGES,
  "sandisk-extreme-pro-64-v30": SANDISK_64_V30_IMAGES,
  "sandisk-extreme-pro-sdxc-200-v30": SANDISK_SDXC_200_V30_IMAGES,
  "boya-by-bm6060": BOYA_BM6060_IMAGES,
  "godox-iflash-im30": GODOX_IFLASH_IM30_IMAGES,
  "dji-rs-4-pro-combo": DJI_RS4_PRO_COMBO_IMAGES,
  "dji-rs-4-pro": DJI_RS4_PRO_IMAGES,
  "dji-rs-5-combo": DJI_RS5_COMBO_IMAGES,
  "dji-rs-4": DJI_RS4_IMAGES,
  "dji-mic-3-2tx-1rx-case": DJI_MIC3_2TX_IMAGES,
  "dji-mic-3-1tx-1rx": DJI_MIC3_1TX_IMAGES,
  "sac-lolobo-grand": SAC_LOLOBO_GRAND_IMAGES,
  "sac-camera": SAC_CAMERA_IMAGES,
  "tripod-candc-dc-999": TRIPOD_CANDC_DC999_IMAGES,
  "tripod-candc-dc-6917": TRIPOD_CANDC_DC6917_IMAGES,
  "tripod-candc-dc-6918": TRIPOD_CANDC_DC6918_IMAGES,
  "feelworld-tp10": FEELWORLD_TP10_IMAGES,
  "kodak-gold-200-film-bundle": KODAK_GOLD_200_IMAGES,
  "deity-v-mic-d3-pro": DEITY_VMIC_D3_PRO_IMAGES,
  "rode-videomic-go": RODE_VIDEOMIC_GO_IMAGES,
  "rode-wireless-go-ii-dual": RODE_WIRELESS_GO_II_DUAL_IMAGES,
  "rode-wireless-go-ii-single": RODE_WIRELESS_GO_II_SINGLE_IMAGES,
  "tamron-28-75-f28-g2-sony-fe": TAMRON_2875_G2_IMAGES,
  "feelworld-f7-plus": FEELWORLD_F7_PLUS_IMAGES,
  "zhiyun-torche-m20": ZHIYUN_TORCHE_M20_IMAGES,
  "vrig-fd-140-rgb": VRIG_FD140_RGB_IMAGES,
  "canon-lc-e6": CANON_LC_E6_IMAGES,
  "canon-lc-e17": CANON_LC_E17_IMAGES,
  "canon-lc-e10": CANON_LC_E10_IMAGES,
  "sony-bc-qz1": SONY_BC_QZ1_IMAGES,
  "canon-lc-e8": CANON_LC_E8_IMAGES,
  "pisen-fz100-charging-box": PISEN_FZ100_CHARGING_BOX_IMAGES,
  "sony-np-f970": SONY_NP_F970_IMAGES,
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
  item(
    "1",
    "sony-a7iv",
    "Sony alpha 7 iv Neuf",
    "Sony alpha 7 iv Neuf",
    21999,
    { slug: "cameras-mirrorless", name: "Hybrides" },
    SONY_A7IV_IMAGES[0],
    undefined,
    3,
    "Neuf",
    128,
  ),
  item(
    "27",
    "sony-fx3",
    "Sony fx3 neuf",
    "Sony fx3 neuf",
    36999,
    { slug: "cameras-cinema", name: "Cinéma" },
    SONY_FX3_IMAGES[0],
    undefined,
    2,
    "Neuf",
    112,
  ),
  item(
    "28",
    "sony-a7iii",
    "Sony a7 iii neuf",
    "Sony a7 iii neuf",
    13999,
    { slug: "cameras-mirrorless", name: "Hybrides" },
    SONY_A7III_IMAGES[0],
    undefined,
    4,
    "Neuf",
    108,
  ),
  item(
    "29",
    "sony-fe-50mm-f18",
    "Sony 50mm f1.8 neuf",
    "Sony 50mm f1.8 neuf",
    2499,
    { slug: "lenses-prime", name: "Fixes (Prime)" },
    SONY_FE_50MM_IMAGES[0],
    undefined,
    8,
    "Neuf",
    96,
  ),
  item(
    "30",
    "sony-fe-24-70-f4",
    "Sony fe 24-70mm f/4 g oss carl zeiss - neuf",
    "Sony fe 24-70mm f/4 g oss carl zeiss - neuf",
    6399,
    { slug: "lenses-zoom", name: "Zoom" },
    SONY_FE_2470_F4_IMAGES[0],
    undefined,
    5,
    "Neuf",
    94,
  ),
  item(
    "31",
    "sony-fe-24-70-f28-gm",
    "Sony fe 24-70mm f/2.8 GM - neuf",
    "Sony fe 24-70mm f/2.8 GM - neuf",
    15699,
    { slug: "lenses-zoom", name: "Zoom" },
    SONY_FE_2470_GM_IMAGES[0],
    undefined,
    3,
    "Neuf",
    92,
  ),
  item(
    "32",
    "sony-np-fz100",
    "Sony NP-FZ100",
    "Sony NP-FZ100",
    300,
    { slug: "batteries-camera", name: "Batteries caméra" },
    SONY_NP_FZ100_IMAGES[0],
    undefined,
    15,
    "Neuf",
    88,
  ),
  item(
    "33",
    "sony-fx30",
    "Sony fx30 bon occasion",
    "Sony fx30 bon occasion",
    15999,
    { slug: "cameras-cinema", name: "Cinéma" },
    SONY_FX30_IMAGES[0],
    undefined,
    1,
    "Bon occasion",
    86,
  ),
  item(
    "34",
    "dji-osmo-pocket-4-creator-combo",
    "Dji osmo pocket 4 creator combo",
    "Dji osmo pocket 4 creator combo",
    7800,
    { slug: "action-cameras", name: "Caméras action" },
    DJI_OSMO_POCKET_4_CREATOR_IMAGES[0],
    undefined,
    5,
    "Creator Combo",
    84,
  ),
  item(
    "35",
    "dji-osmo-pocket-4-standard",
    "Dji osmo pocket 4 standard",
    "Dji osmo pocket 4 standard",
    6100,
    { slug: "action-cameras", name: "Caméras action" },
    DJI_OSMO_POCKET_4_STANDARD_IMAGES[0],
    undefined,
    6,
    "Standard",
    82,
  ),
  item(
    "36",
    "godox-v1-sony",
    "Godox v1 sony",
    "Godox v1 sony",
    1999,
    { slug: "lighting-led-panels", name: "Panneaux LED" },
    GODOX_V1_SONY_IMAGES[0],
    undefined,
    8,
    "Neuf",
    80,
  ),
  item(
    "37",
    "godox-ak-r22",
    "Godox ak-r22",
    "Godox ak-r22",
    299,
    { slug: "lighting-softboxes", name: "Softbox & Modificateurs" },
    GODOX_AK_R22_IMAGES[0],
    undefined,
    12,
    "Neuf",
    78,
  ),
  item(
    "38",
    "godox-lc500r-mini",
    "Godox lc500r mini",
    "Godox lc500r mini",
    1450,
    { slug: "lighting-tubes", name: "Tubes & RGB" },
    GODOX_LC500R_MINI_IMAGES[0],
    undefined,
    6,
    "Neuf",
    76,
  ),
  item(
    "39",
    "kf-concept-nano-b-nd2-400",
    "K&F Concept Nano-B Filtre ND2-400",
    "K&F Concept Nano-B Filtre ND2-400",
    350,
    { slug: "accessories-filters", name: "Filtres ND & CPL" },
    KF_CONCEPT_ND_IMAGES[0],
    undefined,
    10,
    "Neuf",
    74,
  ),
  item(
    "40",
    "hollyland-lark-m2s",
    "Hollyland lark m2s",
    "Hollyland lark m2s",
    1400,
    { slug: "audio-wireless", name: "Sans fil" },
    HOLLYLAND_LARK_M2S_IMAGES[0],
    undefined,
    8,
    "Neuf",
    72,
  ),
  item(
    "41",
    "torche-r8-led-rgb",
    "Torche R8 LED RGB",
    "Torche R8 LED RGB",
    899,
    { slug: "lighting-led-panels", name: "Panneaux LED" },
    TORCHE_R8_RGB_IMAGES[0],
    undefined,
    10,
    "Neuf",
    70,
  ),
  item(
    "42",
    "desview-p5-ii",
    "BESTVIEW DESVIEW P5 II 5,5'' Full HD",
    "BESTVIEW DESVIEW P5 II 5,5'' Full HD",
    1500,
    { slug: "monitors-on-camera", name: "Moniteurs embarqués" },
    DESVIEW_P5_II_IMAGES[0],
    undefined,
    5,
    "Neuf",
    68,
  ),
  item(
    "43",
    "feelworld-f5-prox",
    "FEELWORLD F5 PROX 5.5″ Écran Tactile (4K-HDMI) DSLR Caméra Moniteur de Champ 1600nit",
    "FEELWORLD F5 PROX 5.5″ Écran Tactile (4K-HDMI) DSLR Caméra Moniteur de Champ 1600nit",
    1800,
    { slug: "monitors-on-camera", name: "Moniteurs embarqués" },
    FEELWORLD_F5_PROX_IMAGES[0],
    undefined,
    4,
    "Neuf",
    66,
  ),
  item(
    "44",
    "zoom-h8",
    "Zoom h8",
    "Zoom h8",
    5800,
    { slug: "audio-recorders", name: "Enregistreurs" },
    ZOOM_H8_IMAGES[0],
    undefined,
    3,
    "Neuf",
    64,
  ),
  item(
    "45",
    "lexar-multi-card-reader",
    "Lecteur carte Lexar Multi-Card 3in1 USB 3.1",
    "Lecteur carte Lexar Multi-Card 3in1 USB 3.1",
    350,
    { slug: "memory-readers", name: "Lecteurs de cartes" },
    LEXAR_READER_IMAGES[0],
    undefined,
    12,
    "Neuf",
    62,
  ),
  item(
    "46",
    "c-stand-support",
    "C-stand support",
    "C-stand support",
    1300,
    { slug: "lighting-stands", name: "Pieds & Bras" },
    C_STAND_SUPPORT_IMAGES[0],
    undefined,
    4,
    "Neuf",
    60,
  ),
  item(
    "47",
    "stand-inox",
    "Stand inox",
    "Stand inox",
    600,
    { slug: "lighting-stands", name: "Pieds & Bras" },
    STAND_INOX_IMAGES[0],
    undefined,
    8,
    "Neuf",
    58,
  ),
  item(
    "48",
    "fond-papier-272-11m-bleu",
    "Fond Papier 2,72 X 11m – Bleu",
    "Fond Papier 2,72 X 11m – Bleu",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_BLEU_IMAGES[0],
    undefined,
    6,
    "Neuf",
    56,
  ),
  item(
    "49",
    "fond-papier-272-11m-blanc",
    "Fond Papier 2,72 X 11m - Blanc",
    "Fond Papier 2,72 X 11m - Blanc",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_BLANC_IMAGES[0],
    undefined,
    6,
    "Neuf",
    54,
  ),
  item(
    "50",
    "fond-papier-272-11m-rouge",
    "Fond Papier 2,72 X 11m – Rouge",
    "Fond Papier 2,72 X 11m – Rouge",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_ROUGE_IMAGES[0],
    undefined,
    6,
    "Neuf",
    52,
  ),
  item(
    "51",
    "fond-papier-272-11m-jaune",
    "Fond Papier 2,72 X 11m – Jaune",
    "Fond Papier 2,72 X 11m – Jaune",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_JAUNE_IMAGES[0],
    undefined,
    6,
    "Neuf",
    50,
  ),
  item(
    "52",
    "fond-papier-272-11m-noir",
    "Fond Papier 2,72 X 11m – Noir",
    "Fond Papier 2,72 X 11m – Noir",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_NOIR_IMAGES[0],
    undefined,
    6,
    "Neuf",
    48,
  ),
  item(
    "53",
    "fond-papier-272-11m-vert",
    "Fond Papier 2,72 X 11m – Vert",
    "Fond Papier 2,72 X 11m – Vert",
    650,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    FOND_PAPIER_VERT_IMAGES[0],
    undefined,
    6,
    "Neuf",
    46,
  ),
  item(
    "54",
    "derouleur-fond-mural-3-fonds",
    "Dérouleur fond photo à fixations murales de 3 fonds",
    "Dérouleur fond photo à fixations murales de 3 fonds",
    950,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    DEROULEUR_3_FONDS_IMAGES[0],
    undefined,
    4,
    "Neuf",
    44,
  ),
  item(
    "55",
    "derouleur-fond-mural-4-fonds",
    "Dérouleur fond photo à fixations murales de 4 fonds",
    "Dérouleur fond photo à fixations murales de 4 fonds",
    1300,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    DEROULEUR_4_FONDS_IMAGES[0],
    undefined,
    3,
    "Neuf",
    42,
  ),
  item(
    "56",
    "mini-c-stand",
    "Mini C-stand",
    "Mini C-stand",
    599,
    { slug: "lighting-stands", name: "Pieds & Bras" },
    MINI_C_STAND_IMAGES[0],
    undefined,
    6,
    "Neuf",
    40,
  ),
  item(
    "57",
    "lexar-professional-128-v90-uhs2",
    "Lexar 128GB V90 Professional 2000x UHS-II SDXC",
    "Lexar 128GB V90 Professional 2000x UHS-II SDXC",
    1600,
    { slug: "memory-sd-cf", name: "Cartes SD & CF" },
    LEXAR_128_V90_IMAGES[0],
    undefined,
    8,
    "Neuf",
    38,
  ),
  item(
    "58",
    "sandisk-extreme-pro-128-v30",
    "SANDISK EXTREME PRO 128Go 200MB/s V30 U3",
    "SANDISK EXTREME PRO 128Go 200MB/s V30 U3",
    400,
    { slug: "memory-sd-cf", name: "Cartes SD & CF" },
    SANDISK_128_V30_IMAGES[0],
    undefined,
    15,
    "Neuf",
    36,
  ),
  item(
    "59",
    "sandisk-extreme-pro-64-v30",
    "SANDISK EXTREME PRO 64Go 200MB/s V30",
    "SANDISK EXTREME PRO 64Go 200MB/s V30",
    300,
    { slug: "memory-sd-cf", name: "Cartes SD & CF" },
    SANDISK_64_V30_IMAGES[0],
    undefined,
    18,
    "Neuf",
    34,
  ),
  item(
    "60",
    "sandisk-extreme-pro-sdxc-200-v30",
    "SANDISK EXTREME PRO SDXC UHS-I 200MB V30",
    "SANDISK EXTREME PRO SDXC UHS-I 200MB V30",
    750,
    { slug: "memory-sd-cf", name: "Cartes SD & CF" },
    SANDISK_SDXC_200_V30_IMAGES[0],
    undefined,
    12,
    "Neuf",
    32,
  ),
  item(
    "61",
    "boya-by-bm6060",
    "BOYA BY-BM6060 Shotgun Mic",
    "BOYA BY-BM6060 Shotgun Mic",
    1100,
    { slug: "audio-microphones-shotgun", name: "Micros canon" },
    BOYA_BM6060_IMAGES[0],
    undefined,
    5,
    "Neuf",
    30,
  ),
  item(
    "62",
    "godox-iflash-im30",
    "Godox iflash im30",
    "Godox iflash im30",
    650,
    { slug: "lighting-led-panels", name: "Panneaux LED" },
    GODOX_IFLASH_IM30_IMAGES[0],
    undefined,
    10,
    "Neuf",
    28,
  ),
  item(
    "63",
    "dji-rs-4-pro-combo",
    "DJI RS 4 Pro Combo",
    "DJI RS 4 Pro Combo",
    12100,
    { slug: "stabilization-gimbals", name: "Gimbals" },
    DJI_RS4_PRO_COMBO_IMAGES[0],
    undefined,
    4,
    "Combo",
    48,
  ),
  item(
    "64",
    "dji-rs-4-pro",
    "DJI RS 4 Pro",
    "DJI RS 4 Pro",
    9700,
    { slug: "stabilization-gimbals", name: "Gimbals" },
    DJI_RS4_PRO_IMAGES[0],
    undefined,
    5,
    "Neuf",
    46,
  ),
  item(
    "65",
    "dji-rs-5-combo",
    "DJI RS 5 Combo",
    "DJI RS 5 Combo",
    7500,
    { slug: "stabilization-gimbals", name: "Gimbals" },
    DJI_RS5_COMBO_IMAGES[0],
    undefined,
    4,
    "Combo",
    44,
  ),
  item(
    "66",
    "dji-rs-4",
    "DJI RS 4",
    "DJI RS 4",
    5200,
    { slug: "stabilization-gimbals", name: "Gimbals" },
    DJI_RS4_IMAGES[0],
    undefined,
    6,
    "Neuf",
    42,
  ),
  item(
    "67",
    "dji-mic-3-2tx-1rx-case",
    "DJI Mic 3 (2 TX + 1 RX + Charging Case)",
    "DJI Mic 3 (2 TX + 1 RX + Charging Case)",
    3400,
    { slug: "audio-wireless", name: "Sans fil" },
    DJI_MIC3_2TX_IMAGES[0],
    undefined,
    8,
    "2 TX + 1 RX + Case",
    40,
  ),
  item(
    "68",
    "dji-mic-3-1tx-1rx",
    "DJI Mic 3 (1 TX + 1 RX)",
    "DJI Mic 3 (1 TX + 1 RX)",
    2300,
    { slug: "audio-wireless", name: "Sans fil" },
    DJI_MIC3_1TX_IMAGES[0],
    undefined,
    10,
    "1 TX + 1 RX",
    38,
  ),
  item(
    "69",
    "sac-lolobo-grand",
    "Sac lolobo grand",
    "Sac lolobo grand",
    850,
    { slug: "bags-backpacks", name: "Sacs à dos" },
    SAC_LOLOBO_GRAND_IMAGES[0],
    undefined,
    6,
    "Neuf",
    36,
  ),
  item(
    "70",
    "sac-camera",
    "Sac camera",
    "Sac camera",
    170,
    { slug: "bags-slings", name: "Sacs bandoulière" },
    SAC_CAMERA_IMAGES[0],
    undefined,
    10,
    "Neuf",
    34,
  ),
  item(
    "71",
    "tripod-candc-dc-999",
    "tripod candc dc-999 ( maximum height 1700mm - weight 1360g)",
    "tripod candc dc-999 ( maximum height 1700mm - weight 1360g)",
    250,
    { slug: "stabilization-tripods", name: "Trépieds" },
    TRIPOD_CANDC_DC999_IMAGES[0],
    undefined,
    8,
    "Neuf",
    32,
  ),
  item(
    "72",
    "tripod-candc-dc-6917",
    "tripod candc dc-6917 (maximum height 1700mm - load : 3kg)",
    "tripod candc dc-6917 (maximum height 1700mm - load : 3kg)",
    300,
    { slug: "stabilization-tripods", name: "Trépieds" },
    TRIPOD_CANDC_DC6917_IMAGES[0],
    undefined,
    7,
    "Neuf",
    30,
  ),
  item(
    "73",
    "tripod-candc-dc-6918",
    "tripod candc dc-6918 ( maximum height 1810mm - load 5kg - weight 1610g)",
    "tripod candc dc-6918 ( maximum height 1810mm - load 5kg - weight 1610g)",
    350,
    { slug: "stabilization-tripods", name: "Trépieds" },
    TRIPOD_CANDC_DC6918_IMAGES[0],
    undefined,
    6,
    "Neuf",
    28,
  ),
  item(
    "75",
    "feelworld-tp10",
    "FEELWORLD TP10 Portable 10 téléprompteur pliant",
    "FEELWORLD TP10 Portable 10 téléprompteur pliant",
    1300,
    { slug: "monitors-on-camera", name: "Moniteurs caméra" },
    FEELWORLD_TP10_IMAGES[0],
    undefined,
    4,
    "Neuf",
    24,
  ),
  item(
    "76",
    "kodak-gold-200-film-bundle",
    "Kodak Gold 200 35mm Film Bundle",
    "Kodak Gold 200 35mm Film Bundle",
    200,
    { slug: "studio-packs-photo", name: "Packs Photo" },
    KODAK_GOLD_200_IMAGES[0],
    undefined,
    15,
    "Neuf",
    22,
  ),
  item(
    "77",
    "deity-v-mic-d3-pro",
    "Deity V-MIC D3 PRO",
    "Deity V-MIC D3 PRO",
    1600,
    { slug: "audio-microphones-shotgun", name: "Micros canon" },
    DEITY_VMIC_D3_PRO_IMAGES[0],
    undefined,
    5,
    "Neuf",
    40,
  ),
  item(
    "78",
    "rode-videomic-go",
    "Rode videomic go",
    "Rode videomic go",
    750,
    { slug: "audio-microphones-shotgun", name: "Micros canon" },
    RODE_VIDEOMIC_GO_IMAGES[0],
    undefined,
    8,
    "Neuf",
    38,
  ),
  item(
    "79",
    "rode-wireless-go-ii-dual",
    "RØDE Wireless GO II (double émetteur) – Système micro sans fil",
    "RØDE Wireless GO II (double émetteur) – Système micro sans fil",
    3699,
    { slug: "audio-wireless", name: "Sans fil" },
    RODE_WIRELESS_GO_II_DUAL_IMAGES[0],
    undefined,
    4,
    "Neuf",
    44,
  ),
  item(
    "80",
    "rode-wireless-go-ii-single",
    "RØDE Wireless Go II Single Ultra-compact Dual-channel Wireless Microphone System",
    "RØDE Wireless Go II Single Ultra-compact Dual-channel Wireless Microphone System",
    2699,
    { slug: "audio-wireless", name: "Sans fil" },
    RODE_WIRELESS_GO_II_SINGLE_IMAGES[0],
    undefined,
    6,
    "Neuf",
    42,
  ),
  item(
    "81",
    "tamron-28-75-f28-g2-sony-fe",
    "Tamron 28-75mm F2.8 Di III VXD G2 Sony FE",
    "Tamron 28-75mm F2.8 Di III VXD G2 Sony FE",
    8999,
    { slug: "lenses-zoom", name: "Zoom" },
    TAMRON_2875_G2_IMAGES[0],
    undefined,
    2,
    "Neuf",
    46,
  ),
  item(
    "82",
    "feelworld-f7-plus",
    "FEELWORLD F7 Plus – Moniteur Tactile 7″ 4K",
    "FEELWORLD F7 Plus – Moniteur Tactile 7″ 4K",
    2200,
    { slug: "monitors-on-camera", name: "Moniteurs embarqués" },
    FEELWORLD_F7_PLUS_IMAGES[0],
    undefined,
    4,
    "Neuf",
    44,
  ),
  item(
    "83",
    "zhiyun-torche-m20",
    "Zhiyun torche m20",
    "Zhiyun torche m20",
    1300,
    { slug: "lighting-led-panels", name: "Panneaux LED" },
    ZHIYUN_TORCHE_M20_IMAGES[0],
    undefined,
    6,
    "Neuf",
    42,
  ),
  item(
    "84",
    "vrig-fd-140-rgb",
    "Torche vrig fd-140 rgb fill light",
    "Torche vrig fd-140 rgb fill light",
    500,
    { slug: "lighting-led-panels", name: "Panneaux LED" },
    VRIG_FD140_RGB_IMAGES[0],
    undefined,
    10,
    "Neuf",
    40,
  ),
  item(
    "85",
    "canon-lc-e6",
    "Canon LC-E6 Battery Charger for LP-E6 LP-E6N Li-Ion Batteries",
    "Canon LC-E6 Battery Charger for LP-E6 LP-E6N Li-Ion Batteries",
    150,
    { slug: "power-chargers", name: "Chargeurs" },
    CANON_LC_E6_IMAGES[0],
    undefined,
    12,
    "Neuf",
    38,
  ),
  item(
    "86",
    "canon-lc-e17",
    "CHARGEUR DE BATTERIE CANON LC-E17",
    "CHARGEUR DE BATTERIE CANON LC-E17",
    200,
    { slug: "power-chargers", name: "Chargeurs" },
    CANON_LC_E17_IMAGES[0],
    undefined,
    10,
    "Neuf",
    36,
  ),
  item(
    "87",
    "canon-lc-e10",
    "CHARGEUR DE BATTERIE CANON LC-E10",
    "CHARGEUR DE BATTERIE CANON LC-E10",
    150,
    { slug: "power-chargers", name: "Chargeurs" },
    CANON_LC_E10_IMAGES[0],
    undefined,
    10,
    "Neuf",
    34,
  ),
  item(
    "88",
    "sony-bc-qz1",
    "Battery Charger for NP-FZ100 BC-QZ1",
    "Battery Charger for NP-FZ100 BC-QZ1",
    200,
    { slug: "power-chargers", name: "Chargeurs" },
    SONY_BC_QZ1_IMAGES[0],
    undefined,
    10,
    "Neuf",
    32,
  ),
  item(
    "89",
    "canon-lc-e8",
    "Canon LC-E8 Battery Charger",
    "Canon LC-E8 Battery Charger",
    150,
    { slug: "power-chargers", name: "Chargeurs" },
    CANON_LC_E8_IMAGES[0],
    undefined,
    10,
    "Neuf",
    30,
  ),
  item(
    "90",
    "pisen-fz100-charging-box",
    "PISEN FZ100 Battery Charging Box",
    "PISEN FZ100 Battery Charging Box",
    450,
    { slug: "power-chargers", name: "Chargeurs" },
    PISEN_FZ100_CHARGING_BOX_IMAGES[0],
    undefined,
    8,
    "Neuf",
    28,
  ),
  item(
    "91",
    "sony-np-f970",
    "Sony np-f970",
    "Sony np-f970",
    550,
    { slug: "batteries-camera", name: "Batteries caméra" },
    SONY_NP_F970_IMAGES[0],
    undefined,
    8,
    "Neuf",
    26,
  ),
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
  item("10", "pack-podcast-starter", "Pack Podcast Starter", "Lancez votre podcast en un clic", 2999, { slug: "studio-packs-podcast", name: "Packs Podcast" }, undefined, 3499),
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
