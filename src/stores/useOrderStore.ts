import { create } from "zustand";
import axios from "../lib/axios";
import { OrderResponse, useOrderStoreProps } from "../types/OrderType";
import toast from "react-hot-toast";

export const useOrderStore = create<useOrderStoreProps>((set, get) => ({
  orders: [],
  orderResponse: null,
  loading: false,

  getCustomerOrder: async () => {
    set({ loading: true });
    const res = await axios.get("/order/get_all_customer_order");
    set({ orders: res.data, loading: true });
  },

  fetchOrdersByStatus: async (status) => {
    set({ loading: true });
    try {
      const { data } = await axios.post("/order/status", { status });
      set({ orders: data });
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    const { data } = await axios.patch(`/order/update_status/${orderId}`, {
      status,
    });
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === orderId ? { ...order, status: data.updatedStatus } : order
      ),
    }));
    toast.success(`Order marked as ${status}`);
  },

  getAllOrders: async (page, limit) => {
    try {
      const res = await axios.get<OrderResponse>(
        `/order?page=${page}&limit=${limit}`
      );
      console.log("Order response", res.data);
      set({ orderResponse: res.data });
    } finally {
      set({ loading: false });
    }
  },
}));
