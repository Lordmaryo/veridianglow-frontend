import { create } from "zustand";
import {
  CalculateOrderResponse,
  InitializeCheckoutResponse,
  UsePaymentStoreProps,
} from "../types/paymentType";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const usePaymentStore = create<UsePaymentStoreProps>((set, get) => ({
  paymentResponse: null,
  detailsResponse: null,
  loading: false,
  verifyPaymentResponse: null,

  initializePayment: async ({
    location,
    couponCode,
    orderNote,
    phoneNumber,
    subtotal,
    deliveryFee,
    tax,
    totalAmount,
    discountedTotal,
  }) => {
    console.log("In initialize payment");
    set({ loading: true });
    const res = await axios.post<InitializeCheckoutResponse>(
      "/payment/initialize_checkout",
      {
        location,
        couponCode,
        orderNote,
        phoneNumber,
        subtotal,
        deliveryFee,
        tax,
        totalAmount,
        discountedTotal,
      }
    );

    set({ paymentResponse: res.data });
    console.log("payment initialized... response", res.data);
    if (res.data.paystackResponse.status) {
      window.location.href = res.data.paystackResponse.data.authorization_url;
    }
  },

  calculateOrderDetails: async ({ location, couponCode, phoneNumber }) => {
    set({ loading: true });
    try {
      const res = await axios.post<CalculateOrderResponse>(
        "/payment/calculate_order",
        {
          location,
          couponCode,
          phoneNumber,
        }
      );

      if (res.data.discountedTotal > 0) {
        toast.success("Discount successfully calculated", { id: "success" });
      }

      set({ detailsResponse: res.data });
    } finally {
      set({ loading: false });
    }
  },

  setLoadingState: (loadingState) => {
    set({ loading: loadingState });
  },

  setVerifyPaymentResponse: async (response) => {
    set({ verifyPaymentResponse: response });
  },
}));
