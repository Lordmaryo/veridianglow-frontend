export const categories = [
  { href: "/", name: "Home" },
  { href: "/category/for-men", name: "For Men" },
  { href: "/category/tools-and-kits", name: "Tools & Kits" },
  { href: "/category/kids", name: "Kids" },
  { href: "/shop", name: "Shop" },
  { href: "/category/skin-care", name: "Skin Care" },
  {
    href: "/category/wellness-and-supplements",
    name: "Wellness & Supplement",
  },
  {
    href: "/category/bath-and-body",
    name: "Bath & Body",
    subcategories: [
      { href: "/category/bath-and-body/soaps", name: "Soaps" },
      { href: "/category/bath-and-body/sponges", name: "Sponges" },
      { href: "/category/bath-and-body/bath-oils", name: "Bath Oils" },
    ],
  },
  { href: "/category/korean-skin-care", name: "Korean Skin Care" },
  { href: "/category/skin-repair", name: "Skin Repair" },
  { href: "/consultation", name: "Consultation" },
];

export const shopByCategory = [
  {
    categoryName: "SUN SCREEN",
    href: "/shop/category/sunscreen",
    image: "/sunscreen.webp",
  },
  {
    categoryName: "SERUMS",
    href: "/shop/category/serums",
    image: "/serums.webp",
  },
  {
    categoryName: "BODY LOTIONS",
    href: "/shop/category/body-lotions",
    image: "/lotion.webp",
  },
  {
    categoryName: "SUPPLEMENTS",
    href: "/shop/category/supplements",
    image: "/supplements.webp",
  },
];
