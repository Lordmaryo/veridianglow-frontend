import { CartProducts } from "../types/types";

export const saveCartToLocal = (cart: CartProducts[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const loadCartFromLocal = (): CartProducts[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};
