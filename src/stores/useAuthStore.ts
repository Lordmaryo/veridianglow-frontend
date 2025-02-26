import { create } from "zustand";
import axios from "../lib/axios";
import {
  LogInProps,
  Roles,
  SignUpProps,
  useAuthStoreProps,
  UserResponse,
} from "../types/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

// ERRORS ARE HANDLED GLOBALLY USING AXIOS INTERCEPTORS IN LIB FOLDER

export const useAuthStore = create<useAuthStoreProps>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signUp: async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: SignUpProps) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match", { id: "error" });
    }

    try {
      const res = await axios.post<UserResponse>("auth/signUp", {
        firstName,
        lastName,
        email,
        password,
      });
      set({ user: res.data });
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }: LogInProps) => {
    set({ loading: true });
    try {
      const res = await axios.post<UserResponse>("auth/signin", {
        email,
        password,
      });

      if (get().user?.role === Roles.ADMIN) {
        return toast.success(res.data.message);
      }
      set({ user: res.data });
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get<UserResponse>("/auth/profiles");
      set({ user: res.data, checkingAuth: false });
      console.log(res.data);
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },

  logout: async () => {
    await axios.post("/auth/logout");
    set({ user: null });
  },

  forgotPassword: async (email) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match", { id: "error" });
      return;
    }

    set({ loading: true });
    try {
      const res = await axios.put(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message);
      window.location.href = "/signIn";
    } finally {
      set({ loading: false });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const res = await axios.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );

      set({ user: res.data.user, checkingAuth: false });
      return res.data.user;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/verify-email", { code });
      set({ user: res.data });
      toast.success("Email verification success!");
    } finally {
      set({ loading: false });
    }
  },
}));

let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 403) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      (originalRequest?.url === "/auth/signin" ||
        originalRequest?.url === "/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        refreshPromise = useAuthStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        if (
          refreshError.response?.status === 401 ||
          refreshError.response?.status === 403
        ) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * TODO - disable add button in cart if quantity is greater than stock
 * TODO - fix axios intrceptor it might not be working because of protected route uses 401
 * TODO - make product card decent in mobile device
 * TODO - include delivery location and order notes in order response
 * TODO - make the page load faster
 * TODO - complete admin dashboard
 * TODO - create get archived products for admin draft
 * TODO - add a placeholder to the video poster in hero
 * TODO - refactor types
 */
