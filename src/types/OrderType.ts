export interface useOrderStoreProps {
  loading: boolean;
  orders: Order[];
  getCustomerOrder: () => Promise<void>;
}

export interface Order {
  _id: string;
  products: {
    productName: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
  paid: boolean;
  subtotal: number;
  deliveryFee: number;
  deliveryLocation: string;
  estimatedDeliveryDate: Date;
  totalAmount: number;
  status:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "SHIPPED"
    | "DELIVERED"
    | "ABANDONED"
    | "CANCELED";
  gatewayResponse: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
