import {
  Address,
  AddressResponse,
  useUserStoreProps,
  Wishlists,
} from "./../types/userTypes";
import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create<useUserStoreProps>((set) => ({
  address: null,
  wishlists: null,
  loading: false,

  addAddress: async ({ street, city, state, country, zipCode }) => {
    set({ loading: true });
    try {
      const res = await axios.post<AddressResponse>("/user/address", {
        street,
        city,
        state,
        country,
        zipCode,
      });
      toast.success(res.data.message);
      set({ address: res.data, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  editAddress: async ({ street, city, state, country, zipCode }) => {
    set({ loading: true });
    try {
      const res = await axios.put<AddressResponse>("/user/edit/address", {
        street,
        city,
        state,
        country,
        zipCode,
      });
      toast.success(res.data.message);
      set({ address: res.data });
    } finally {
      set({ loading: false });
    }
  },

  loadAddress: async () => {
    set({ loading: true });
    try {
      const res = await axios.get<{ address: Address }>("/user/address");
      set({ address: res.data.address });
    } finally {
      set({ loading: false });
    }
  },

  getWishlists: async () => {
    set({ loading: true });
    try {
      const res = await axios.get<{ wishlists: Wishlists[] }>("/user/wishlist");
      set({ wishlists: res.data.wishlists });
    } finally {
      set({ loading: false });
    }
  },

  addToWishlist: async (product) => {
    set({ loading: true });
    try {
      const res = await axios.post<{ message: string; productId: string }>(
        "/user/wishlist",
        { productId: product.productId }
      );
      toast.success(res.data.message);

      set((prevState) => {
        const productExist = prevState.wishlists?.some(
          (wishlist) => wishlist.productId === product.productId
        );

        if (productExist) {
          return prevState;
        }

        return {
          wishlists: [
            ...prevState.wishlists!,
            {
              productId: product.productId,
              name: product.name,
              averageRating: product.averageRating,
              image: product.image,
              price: product.price,
              discountPrice: product.discountPrice,
            },
          ],
        };
      });
    } catch (error) {
      toast.error("Failed to add to wishlist.");
    } finally {
      set({ loading: false });
    }
  },

  removeFromWishlist: async (product) => {
    set({ loading: true });
    try {
      const res = await axios.delete<{ message: string }>(
        `/user/wishlist/${product.productId}`
      );

      set((prevState) => {
        const updatedWishlist = prevState.wishlists?.filter(
          (WishList) => WishList.productId !== product.productId
        );

        return { wishlists: updatedWishlist };
      });

      toast.success(res.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
