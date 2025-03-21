import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import {
  CreateProduct,
  Product,
  useProductStoreProps,
} from "../types/ProductTypes";

export const useProductStore = create<useProductStoreProps>(
  (set): useProductStoreProps => ({
    loading: false,
    products: [],
    singleProduct: null,

    setProduct: (products: Product[]) => set({ products }),

    createProduct: async (newProduct: CreateProduct) => {
      try {
        set({ loading: true });
        const res = await axios.post("/product", newProduct);

        set((state) => ({
          products: [...state.products, res.data],
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
        set({ products: res.data });
        return res.data;
      } finally {
        set({ loading: false });
      }
    },

    toggleFeauturedProduct: async (productId) => {
      const res = await axios.patch<{
        success: boolean;
        isFeatured: boolean;
      }>(`/product/update_feature/${productId}`);
      console.log("Toggle product", res.data);
      set((prevProduct) => ({
        products: prevProduct.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
      }));
    },

    toggleArchivedProduct: async (productId) => {
      const res = await axios.patch<{ success: boolean; isArchived: boolean }>(
        `/product/update_archived/${productId}`
      );
      set((prevProduct) => ({
        products: prevProduct.products.map((product) =>
          product._id === productId
            ? { ...product, isArchived: res.data.isArchived }
            : product
        ),
      }));
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

    updateProduct: async (productId, product) => {
      set({ loading: true });
      try {
        const res = await axios.put<{
          message: string;
          updatedProduct: Product;
        }>(`/product/update/${productId}`, product);

        set((prevState) => {
          return {
            products: prevState.products.map((product) =>
              product._id === productId ? res.data.updatedProduct : product
            ),
          };
        });
        toast.success(res.data.message);
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

    getProductById: async (productId) => {
      set({ loading: true });
      try {
        const res = await axios.get<Product>(
          `/product/find_product/${productId}`
        );
        set({ singleProduct: res.data });
        return res.data;
      } finally {
        set({ loading: false });
      }
    },

    getRelatedProduct: async (category) => {
      const res = await axios.get(`/product/related_products/${category}`);
      return res.data;
    },

    getUnarchivedProducts: async (page, limit) => {
      const res = await axios.get(
        `/product/all_unarchived?page=${page}&limit=${limit}`
      );
      return res.data;
    },

    getProductsByCategory: async (page, limit, category) => {
      const res = await axios.get(
        `/product/category/${category}?page=${page}&limit=${limit}`
      );
      return res.data;
    },

    getProductsForMen: async (page, limit) => {
      const res = await axios.get(`/product/men?page=${page}&limit=${limit}`);
      return res.data;
    },

    getProductsForKids: async (page, limit) => {
      const res = await axios.get(`/product/kids?page=${page}&limit=${limit}`);
      return res.data;
    },

    getProductsByOtherCategories: async (page, limit, otherCategory) => {
      const res = await axios.get(
        `/product/products_by_other_category/${otherCategory}/?page=${page}&limit=${limit}`
      );
      return res.data;
    },

    getProductsByMenCategory: async (page, limit, category) => {
      const res = await axios.get(
        `/product/men_category/${category}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  })
);
