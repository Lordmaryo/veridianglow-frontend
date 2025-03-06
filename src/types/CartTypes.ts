import { Product } from "./ProductTypes";
import { Coupon } from "./types";

export interface CartProducts {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  discountPrice: number;
  stock: number;
  isOutOfStock: boolean;
  quantity: number;
  total: number;
}

export interface useCartStoreProps {
  cart: CartProducts[];
  total: number;
  coupons: Coupon[] | null;
  subTotal: number;
  shouldReinitializeCheckout: boolean;
  loading: boolean;
  isOutOfStock: boolean;
  addToCart: (product: Product) => Promise<void>;
  getMyCoupons: () => Promise<void>;
  resetReinitializeFlag: () => void;
  removeAllFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  syncCartToDatabase: (cartItems: CartProducts[]) => void;
  calculateTotals: () => void;
  clearCart: () => void;
}
