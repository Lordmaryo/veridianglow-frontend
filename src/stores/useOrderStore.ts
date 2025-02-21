import { create } from "zustand";
import axios from "../lib/axios";
import { useOrderStoreProps } from "../types/OrderType";

export const useOrderStore = create<useOrderStoreProps>((set, get) => ({
  orders: [],
  loading: false,

  getCustomerOrder: async () => {
    set({ loading: true });
    const res = await axios.get("/order/get_all_customer_order");
    set({ orders: res.data, loading: true });
  },
}));
