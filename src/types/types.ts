export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LogInProps {
  email: string;
  password: string;
}

export interface useAuthStoreProps {
  user: UserResponse | null;
  loading: boolean;
  checkingAuth: boolean;
  signUp: (props: SignUpProps) => void;
  login: (props: LogInProps) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

export interface UserResponse {
  message?: string;
  status: string;
  userId: string;
  firstName: string;
  role: Roles;
  isVerified: boolean;
}

export enum Roles {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
  pagination: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
  };
  totalPages: number;
}

export interface useProductStoreProps {
  loading: boolean;
  products: Product[];
  setProduct: (products: Product[]) => void;
  createProduct: (newProduct: CreateProduct) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getAllProduct: () => Promise<Product[]>;
  toggleFeauturedProduct: (productId: string) => Promise<void>;
  toggleArchivedProduct: (productId: string) => Promise<void>;
  fetchFeauturedProduct: () => Promise<Product[]>;
  getProductById: (productId: string) => Promise<Product>;
  getRelatedProduct: (category: string) => Promise<Product[]>;
  getUnarchivedProducts: (
    page: number,
    limit: number
  ) => Promise<ProductResponse>;
  // fetchProductByCategory: (category: string) => Promise<void>;
}

export interface CartStore {
  cartItems: Product[];
  total: number;
  subTotal: number;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  loadCartFromLocalStorage: () => void;
  // syncCartToDatabase: () => void;
}

export interface CartProducts extends Product {
  quantity: number;
  total: number;
}

export interface useCartStoreProps {
  cart: CartProducts[];
  total: number;
  subTotal: number;
  loading: boolean;
  isOutOfStock: boolean;
  getCartItems: () => Promise<void>;
  // addToCart: (product: CartProducts) => Promise<void>;
  addToCart: any;
  removeAllFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  calculateTotals: () => void;
  clearCart: () => void;
}

export interface Product {
  _id: string; // watch this
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  isOutOfStock: boolean;
  howToUse?: string;
  image: string;
  category: string;
  subCategory: "MEN" | "WOMEN" | "KIDS" | "ALL";
  brand?: string;
  ingredients?: string[];
  ratings: {
    userId: string;
    rating: number;
    review?: string;
  }[];
  averageRating: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  howToUse: string;
  image: string;
  category: string;
  subCategory: string;
  brand: string;
  ingredients: string[];
  isOutOfStock: boolean;
  isFeatured: boolean;
  isArchived: boolean;
}
