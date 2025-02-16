import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { CreateProduct, Product, useProductStoreProps } from "../types/types";

export const useProductStore = create<useProductStoreProps>(
  (set, get): useProductStoreProps => ({
    loading: false,
    products: [],

    setProduct: (products: Product[]) => set({ products }),

    createProduct: async (newProduct: CreateProduct) => {
      try {
        set({ loading: true });
        const res = await axios.post("/product", newProduct);
        set((prevState: { products: Product[] }) => ({
          products: [...prevState.products, res.data],
          loading: false,
        }));
        toast.success("Product uploaded!");
      } finally {
        set({ loading: false });
      }
    },

    getAllProduct: async () => {
      set({ loading: true });
      try {
        const res = await axios.get("/product");
        return res.data;
      } finally {
        set({ loading: false });
      }
    },

    toggleFeauturedProduct: async (productId) => {
      set({ loading: true });
      try {
        const res = await axios.patch<Product>(
          `/product/update_feature/${productId}`
        );
        set((prevProduct) => ({
          products: prevProduct.products.map((product) =>
            product._id === productId
              ? { ...product, isFeatured: res.data.isFeatured }
              : product
          ),
        }));
      } finally {
        set({ loading: false });
      }
    },

    toggleArchivedProduct: async (productId) => {
      set({ loading: true });
      try {
        const res = await axios.patch<Product>(
          `/product/update_archived/${productId}`
        );
        set((prevProduct) => ({
          products: prevProduct.products.map((product) =>
            product._id === productId
              ? { ...product, isFeatured: res.data.isFeatured }
              : product
          ),
        }));
      } finally {
        set({ loading: false });
      }
    },

    deleteProduct: async (productId) => {
      set({ loading: true });
      try {
        await axios.delete(`/product/delete/${productId}`);
        set((prevState) => ({
          products: prevState.products.filter(
            (product) => product._id !== productId
          ),
        }));
        toast.success("Product deleted successfully");
      } finally {
        set({ loading: false });
      }
    },

    fetchFeauturedProduct: async () => {
      set({ loading: true });
      try {
        const res = await axios.get("/product/featured");
        // set({ products: res.data });
        return res.data;
      } finally {
        set({ loading: false });
      }
    },
  })
);
