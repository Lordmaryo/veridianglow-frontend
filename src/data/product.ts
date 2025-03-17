import { Product, ProductResponse } from "../types/ProductTypes";

export const productCategories = [
  "Serums",
  "Soaps",
  "Cleansers",
  "Moisturizers",
  "Face Masks",
  "Face Scrub",
  "Supplements",
  "Toners",
  "Sunscreens",
  "Lip Care",
  "Korean Skin Care",
  "Tools and kits",
  "Bath and body",
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
  "Skin Repair",
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

export const sortingOptions = () => {
  return [
    {
      title: "Sort by Latest",
      sortFunction: (productResponse: ProductResponse) => {
        return [...productResponse.products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
    },
    {
      title: "Sort by Top Rating",
      sortFunction: (productResponse: ProductResponse) => {
        return [...productResponse.products].sort(
          (a, b) => b.averageRating - a.averageRating
        );
      },
    },
    {
      title: "Sort by Average Rating",
      sortFunction: (productResponse: ProductResponse) => {
        return [...productResponse.products].sort(
          (a, b) => b.averageRating - a.averageRating
        );
      },
    },
    {
      title: "Sort by Price: High to Low",
      sortFunction: (roductResponse: ProductResponse) => {
        return [...roductResponse.products].sort(
          (a, b) => b.discountPrice - a.discountPrice
        );
      },
    },
    {
      title: "Sort by Price: Low to High",
      sortFunction: (productResponse: ProductResponse) => {
        return [...productResponse.products].sort(
          (a, b) => a.discountPrice - b.discountPrice
        );
      },
    },
  ];
};
