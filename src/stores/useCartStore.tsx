import { create } from "zustand";
import { loadCartFromLocal, saveCartToLocal } from "../utils/cartUtils";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { CartProducts, useCartStoreProps } from "../types/CartTypes";
import { Coupon } from "../types/couponType";

export const useCartStore = create<useCartStoreProps>((set, get) => ({
  cart: loadCartFromLocal(),
  coupons: null,
  total: 0,
  subTotal: 0,
  loading: false,
  isOutOfStock: false,
  shouldReinitializeCheckout: false,

  addToCart: async (product) => {
    set((prevState) => {
      const existingItem = prevState.cart.find(
        (item) => item.id === product._id
      );
      if (existingItem) {
        return prevState;
      }

      const newCartItems = [
        ...prevState.cart,
        {
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          category: product.category,
          stock: product.stock,
          isOutOfStock: product.isOutOfStock,
          discountPrice: product.discountPrice,
          quantity: 1,
          total: product.discountPrice * 1,
        },
      ];

      saveCartToLocal(newCartItems);
      console.log("This is the cart product", product);
      toast.success("added product to cart");
      return { cart: newCartItems, loading: false };
    });

    get().calculateTotals();
  },

  removeAllFromCart: async (productId: string) => {
    set((prevState) => {
      const updatedCart = prevState.cart.filter(
        (item) => item.id !== productId
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
        if (item.id === productId) {
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

  syncCartToDatabase: async (cartItems) => {
    set({ loading: true });
    try {
      const res = await axios.post<{
        message: string;
        success: boolean;
        cart: CartProducts[];
      }>("/cart/sync", {
        cartItems,
      });

      set({ cart: res.data.cart });
    } finally {
      set({ loading: false });
    }
  },

  calculateTotals: () => {
    const { cart } = get();

    const subTotal = cart.reduce((sum, item) => sum + item.total, 0);
    const total = subTotal;

    set(() => ({ subTotal, total, shouldReinitializeCheckout: true }));
  },

  // when user buys or logs out
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
    get().calculateTotals();
  },

  getMyCoupons: async () => {
    set({ loading: true });
    try {
      const res = await axios.get<Coupon[]>("/coupon");
      set({ coupons: res.data });
    } finally {
      set({ loading: false });
    }
  },

  resetReinitializeFlag: () => {
    set({ shouldReinitializeCheckout: false });
  },
}));
