import {
  Address,
  AddressResponse,
  useUserStoreProps,
} from "./../types/userTypes";
import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create<useUserStoreProps>((set) => ({
  address: null,
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
}));
