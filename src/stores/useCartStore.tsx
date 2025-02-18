import { create } from "zustand";
import { CartProducts, useCartStoreProps } from "../types/types";
import { loadCartFromLocal, saveCartToLocal } from "../utils/cartUtils";

export const useCartStore = create<useCartStoreProps>((set, get) => ({
  cart: loadCartFromLocal(),
  total: 0,
  subTotal: 0,
  loading: false,
  isOutOfStock: false,

  getCartItems: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/cart", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      set({ cart: data.cart });
      get().calculateTotals();
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product: CartProducts) => {
    set((prevState) => {
      const existingItem = prevState.cart.find(
        (item) => item._id === product._id
      );
      if (existingItem) {
        return prevState;
      }

      const newCartItems = [
        ...prevState.cart,
        { ...product, quantity: 1, total: product.discountPrice * 1 },
      ];

      saveCartToLocal(newCartItems);
      return { cart: newCartItems, loading: false };
    });

    get().calculateTotals();
  },

  removeAllFromCart: async (productId: string) => {
    set((prevState) => {
      const updatedCart = prevState.cart.filter(
        (item) => item._id !== productId
      );

      saveCartToLocal(updatedCart);

      return { cart: updatedCart };
    });
    get().calculateTotals();
  },

  updateQuantity: async (productId: string, quantity: number) => {
    if (quantity < 1) return get().removeAllFromCart(productId);

    set((prevState) => {
      const updatedCart = prevState.cart.map((item) => {
        if (item._id === productId) {
          const isOutOfStock = quantity + 1 > item.stock;
          return {
            ...item,
            quantity,
            isOutOfStock,
            total: item.discountPrice * quantity,
          };
        }
        return item;
      });

      const isAnyOutOfStock = updatedCart.some((item) => item.isOutOfStock);

      saveCartToLocal(updatedCart);
      return { cart: updatedCart, isOutOfStock: isAnyOutOfStock };
    });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart } = get();

    const subTotal = cart.reduce((sum, item) => sum + item.total, 0);
    const total = subTotal;

    set(() => ({ subTotal, total }));
  },

  // when user buys or logs out
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
    get().calculateTotals();
  },
}));
