import { Product } from "../types/types";

export const productCategories = [
  "Serums",
  "Soaps",
  "Cleansers",
  "Moisturizers",
  "Face Masks",
  "Toners",
  "Sunscreens",
  "Lip Care",
  "Eye Creams",
  "Concealers",
  "Blushes",
  "Highlighters",
  "Bronzers",
  "Primers",
  "Setting Sprays",
  "Lipsticks",
  "Lip Glosses",
  "Lip Liners",
  "Eyeliners",
  "Makeup Removers",
  "Exfoliators",
  "Hair Care",
  "Shampoos",
  "Conditioners",
  "Hair Oils",
  "Hair Treatments",
  "Body Lotions",
  "Body Scrubs",
  "Essential Oils",
  "Deodorants",
  "Bath Salts",
  "Hand Creams",
  "Foot Creams",
  "Beard Care",
  "Men’s Grooming",
  "Organic & Natural",
  "Anti-Aging Products",
  "Face Toner",
];

export const subCategory = ["All", "Men", "Women", "Kids"];

export const productDetailSection = (product: Product) => {
  return [
    {
      key: "information",
      title: "Information",
      content: `We currently deliver to Nigeria only via the website. If you do not see
      your location at checkout, please contact us on whatsapp (+234) 1234567 or
      email us at support@veridianglow.com`,
    },
    { key: "description", title: "Description", content: product.description },
    { key: "howToUse", title: "How to use", content: product.howToUse },
    {
      key: "ingredients",
      title: "Ingredients",
      content: product.ingredients?.length
        ? /*html*/ `<ul className="list-disc space-y-2">${product.ingredients
            .map((p) => `<li>${p}</li>`)
            .join("")}</ul>`
        : "No content provided.",
    },
  ];
};
