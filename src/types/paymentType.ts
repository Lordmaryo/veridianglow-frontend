export interface UsePaymentStoreProps {
  paymentResponse: InitializeCheckoutResponse | null;
  detailsResponse: CalculateOrderResponse | null;
  verifyPaymentResponse: VerifyResponse | null;
  loading: boolean;

  initializePayment: ({
    location,
    couponCode,
    orderNote,
    phoneNumber,
    subtotal,
    deliveryFee,
    tax,
    totalAmount,
    discountedTotal,
  }: CheckoutDetails) => Promise<void>;
  calculateOrderDetails: ({
    location,
    couponCode,
    phoneNumber,
  }: OrderDetails) => Promise<void>;
  setLoadingState: (loadingState: boolean) => void;
  setVerifyPaymentResponse: (response: VerifyResponse) => Promise<void>;
}

export type CheckoutDetails = {
  phoneNumber: string;
  couponCode?: string;
  orderNote?: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    buildingType?: string;
  };
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  discountedTotal: number;
};

export type OrderDetails = {
  phoneNumber: string;
  couponCode?: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    buildingType?: string;
  };
};

export interface InitializeCheckoutResponse {
  orderId: string;
  paystackResponse: PaystackResponse;
}

export interface CalculateOrderResponse {
  subtotal: number;
  deliveryFee: number;
  discountedTotal: number;
  tax: number;
  totalAmount: number;
  email: string;
}

export interface VerifyResponse {
  status: "success" | "failed" | "abandoned";
  gatewayResponse: "Successful" | "Declined";
  orderId: string;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
