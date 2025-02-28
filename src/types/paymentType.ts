export interface UsePaymentStoreProps {
  paymentResponse: InitializeCheckoutResponse | null;
  productsOrder: CheckoutDetails["products"] | null;
  loading: boolean;
  initializeCheckout: ({
    products,
    location,
    currency,
    couponCode,
    orderNote,
    phoneNumber,
  }: CheckoutDetails) => Promise<void>;
}

export type CheckoutDetails = {
  phoneNumber: string;
  products: {
    productName: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
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
  email: string;
  currency: "NGN";
};

export interface InitializeCheckoutResponse {
  orderId: string;
  subtotal: number;
  deliveryFee: number;
  discountedTotal: number;
  tax: number;
  totalAmount: number;
  paystackResponse: PaystackResponse;
}

interface PaystackResponse {
  status: true;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
