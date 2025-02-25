import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { CreateProduct, Product, useProductStoreProps } from "../types/types";

export const useProductStore = create<useProductStoreProps>(
  (set, get): useProductStoreProps => ({
    loading: false,
    products: [],
    singleProduct: null,

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

    updateProduct: async (productId, product) => {
      set({ loading: true });
      try {
        const res = await axios.put<{
          message: string;
          updatedProduct: Product;
        }>(`/product/update/${productId}`, product);

        set({ singleProduct: res.data.updatedProduct });
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

    getProductsByDifferentCategories: async (
      page,
      limit,
      mainCategory,
      otherCategory
    ) => {
      const res = await axios.get(
        `/product/different_category/${mainCategory}/${otherCategory}?page=${page}&limit=${limit}`
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
