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

export interface useProductStoreProps {
  loading: boolean;
  products: Product[];
  setProduct: (products: Product[]) => void;
  createProduct: (newProduct: CreateProduct) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getAllProduct: () => Promise<Product[]>;
  toggleFeauturedProduct: (productId: string) => Promise<void>;
  toggleArchivedProduct: (productId: string) => Promise<void>;
  // fetchProductByCategory: (category: string) => Promise<void>;
  // fetchFeauturedProduct: () => Promise<void>;
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
