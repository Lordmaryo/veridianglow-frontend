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
}));

/**
 * TODO - add an admin dashboard in the navbar
 * TODO - implement a create product in admin
 * TODO - add a placeholder to the video poster in hero
 */
