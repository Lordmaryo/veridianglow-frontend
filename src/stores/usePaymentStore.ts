import { create } from "zustand";
import {
  CheckoutDetails,
  InitializeCheckoutResponse,
  UsePaymentStoreProps,
} from "../types/paymentType";
import axios from "../lib/axios";

export const usePaymentStore = create<UsePaymentStoreProps>((set, get) => ({
  paymentResponse: null,
  productsOrder: null, // TODO: check this
  loading: false,

  initializeCheckout: async ({
    products,
    location,
    currency,
    couponCode,
    orderNote,
    phoneNumber,
  }: CheckoutDetails) => {
    set({ loading: true });
    try {
      const res = await axios.post<InitializeCheckoutResponse>(
        "/payment/initialize_checkout",
        {
          products,
          location,
          currency,
          couponCode,
          orderNote,
          phoneNumber,
        }
      );

      if (res.status === 200) set({ productsOrder: products });
      set({ paymentResponse: res.data });
    } finally {
      set({ loading: false });
    }
  },
}));
