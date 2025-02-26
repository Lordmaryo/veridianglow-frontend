export interface useOrderStoreProps {
  loading: boolean;
  orderResponse: OrderResponse | null;
  orders: Order[];
  getCustomerOrder: () => Promise<void>;
  fetchOrdersByStatus: (status: string) => Promise<void>;
  getAllOrders: (page: number, limit: number) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: "SHIPPED" | "DELIVERED"
  ) => Promise<void>;
}

export enum OrderStatus {
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  ABANDONED = "ABANDONED",
  CANCELED = "CANCELED",
}

export interface Order {
  _id: string;
  userId: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  products: {
    _id: string;
    productName: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
  paid: boolean;
  orderNote?: string;
  subtotal: number;
  deliveryFee: number;
  deliveryLocation: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  estimatedDeliveryDate: Date;
  amountPaid: string;
  totalAmount: number;
  status: OrderStatus;
  gatewayResponse: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderResponse {
  success: boolean;
  orders: Order[];
  pagination: {
    totalOrders: number;
    currentPage: number;
    totalPages: number;
  };
}
