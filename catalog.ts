/**
 * Julikart product & service catalog.
 * Single source of truth shared by frontend (display) and backend
 * (server-side price validation for orders). Prices are in pesewas (GHS * 100).
 */

export const BUSINESS = {
  name: "Julikart",
  tagline: "Eat. Stay. Shop.",
  description:
    "Julikart is a restaurant, hotel and shopping mart on the Mallam–Gbawe Road in Accra, Ghana. Dine in or order authentic Ghanaian food, book a comfortable room, and shop everyday essentials — all in one stop.",
  address: "300 Gbawe Road, McCarthy Hill, Gbawe, Accra, Ghana",
  area: "Mallam–Gbawe Road, near Julikart bus stop",
  phones: ["+233 26 749 5057", "+233 30 222 9043", "+233 27 772 6933"],
  hours: [
    { days: "Monday – Saturday", time: "6:00 AM – 12:00 AM" },
    { days: "Sunday", time: "4:00 PM – 12:00 AM" },
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Julikart%20300%20Gbawe%20Road%20Gbawe%20Accra",
} as const;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  pricePesewas: number;
  image: string;
  alt: string;
  tag?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  pricePesewas: number;
  image: string;
  alt: string;
  category: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNightPesewas: number;
  image: string;
  alt: string;
  capacity: number;
  amenities: string[];
};

export const MENU: MenuItem[] = [
  {
    id: "jollof-chicken",
    name: "Party Jollof & Grilled Chicken",
    description:
      "Smoky party-style jollof rice with a charcoal-grilled chicken quarter, fried plantain and fresh tomato salsa.",
    pricePesewas: 8500,
    image: "/images/menu-jollof.webp",
    alt: "Bowl of Ghanaian party jollof rice with grilled chicken and fried plantain",
    tag: "Most loved",
  },
  {
    id: "assorted-fried-rice",
    name: "Assorted Fried Rice",
    description:
      "Our signature fried rice loaded with shrimp, chicken, liver and diced vegetables, tossed over the fire.",
    pricePesewas: 9000,
    image: "/images/menu-fried-rice.webp",
    alt: "Ghanaian assorted fried rice with shrimp and vegetables in a ceramic bowl",
  },
  {
    id: "banku-tilapia",
    name: "Banku & Grilled Tilapia",
    description:
      "Soft fermented banku with a whole charcoal-grilled tilapia, fresh pepper sauce, onions and tomato.",
    pricePesewas: 11000,
    image: "/images/menu-banku.webp",
    alt: "Banku with whole grilled tilapia, pepper sauce and sliced onions",
    tag: "Signature",
  },
  {
    id: "waakye-special",
    name: "Waakye Special",
    description:
      "Rice and beans cooked with millet leaves, served with boiled egg, fried fish, spaghetti and shito.",
    pricePesewas: 7000,
    image: "/images/menu-waakye.webp",
    alt: "Waakye rice and beans with boiled egg, fried fish and shito sauce",
  },
  {
    id: "kelewele",
    name: "Kelewele",
    description:
      "Ripe plantain cubes marinated in ginger, chilli and spices, fried golden and served with roasted peanuts.",
    pricePesewas: 3500,
    image: "/images/menu-kelewele.webp",
    alt: "Spicy fried kelewele plantain cubes with roasted peanuts in a clay bowl",
  },
  {
    id: "grilled-chicken-chips",
    name: "Grilled Chicken & Chips",
    description:
      "Half chicken, marinated overnight and grilled over charcoal, served with thick-cut chips and pepper sauce.",
    pricePesewas: 9500,
    image: "/images/menu-chicken.webp",
    alt: "Charcoal grilled half chicken with chips and pepper sauce",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "rice-5kg",
    name: "Premium Long Grain Rice 5kg",
    description: "Milled long grain rice — perfect for jollof, fried rice and waakye.",
    pricePesewas: 22000,
    image: "/images/prod-rice.webp",
    alt: "Five kilogram sack of premium long grain rice with a bowl of raw rice",
    category: "Pantry",
  },
  {
    id: "cooking-oil",
    name: "Cooking & Palm Oil Duo",
    description: "Golden vegetable oil and rich red palm oil for everyday Ghanaian cooking.",
    pricePesewas: 13500,
    image: "/images/prod-oil.webp",
    alt: "Bottle of golden cooking oil beside a bottle of red palm oil",
    category: "Pantry",
  },
  {
    id: "drinks-pack",
    name: "Soft Drinks & Juice Pack",
    description: "A chilled mix of soft drinks and fruit juices — great for the family table.",
    pricePesewas: 8500,
    image: "/images/prod-drinks.webp",
    alt: "Assorted soft drink and fruit juice bottles and cans",
    category: "Beverages",
  },
  {
    id: "fresh-bread",
    name: "Fresh Sugar & Tea Bread",
    description: "Baked fresh every morning — soft sugar bread and classic tea bread loaves.",
    pricePesewas: 3000,
    image: "/images/prod-bread.webp",
    alt: "Fresh baked Ghanaian sugar bread and tea bread loaves",
    category: "Bakery",
  },
  {
    id: "water-pack",
    name: "Bottled Water 12-Pack",
    description: "Twelve 500ml bottles of purified drinking water, sealed for freshness.",
    pricePesewas: 4500,
    image: "/images/prod-water.webp",
    alt: "Shrink-wrapped pack of bottled drinking water",
    category: "Beverages",
  },
  {
    id: "toiletries-set",
    name: "Everyday Toiletries Set",
    description: "Soap, toothpaste and body lotion — daily essentials in one convenient set.",
    pricePesewas: 6500,
    image: "/images/prod-toiletries.webp",
    alt: "Set of toiletries with soap, toothpaste and body lotion",
    category: "Home & Care",
  },
];

export const ROOMS: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    description:
      "A calm, comfortable queen room with everything you need for a restful night on the Mallam–Gbawe Road.",
    pricePerNightPesewas: 45000,
    image: "/images/room-standard.webp",
    alt: "Standard hotel room with queen bed, white linens and terracotta throw blanket",
    capacity: 2,
    amenities: ["Queen bed", "Air conditioning", "Free Wi-Fi", "En-suite bathroom", "Flat-screen TV"],
  },
  {
    id: "deluxe",
    name: "Deluxe Double",
    description:
      "Extra space to unwind — a king bed, a cosy seating corner and warm, considered finishes.",
    pricePerNightPesewas: 65000,
    image: "/images/room-deluxe.webp",
    alt: "Deluxe double hotel room with king bed and seating area in warm tones",
    capacity: 3,
    amenities: ["King bed", "Air conditioning", "Free Wi-Fi", "Seating area", "Breakfast included", "Flat-screen TV"],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description:
      "Our finest stay: a king bedroom with a private lounge — ideal for longer visits and special occasions.",
    pricePerNightPesewas: 95000,
    image: "/images/room-suite.webp",
    alt: "Executive hotel suite with king bed and a separate private lounge",
    capacity: 4,
    amenities: ["King bed", "Private lounge", "Air conditioning", "Free Wi-Fi", "Breakfast included", "Mini bar"],
  },
];

export function formatGhs(pesewas: number): string {
  return `GH₵ ${(pesewas / 100).toFixed(2)}`;
}

export function findCatalogItem(id: string): { name: string; pricePesewas: number } | null {
  const menu = MENU.find((m) => m.id === id);
  if (menu) return { name: menu.name, pricePesewas: menu.pricePesewas };
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) return { name: product.name, pricePesewas: product.pricePesewas };
  return null;
}

export function findRoom(id: string): Room | null {
  return ROOMS.find((r) => r.id === id) ?? null;
}
