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

export interface useProductStoreProps {
  loading: boolean;
  products: Product[];
  singleProduct: Product | null;
  setProduct: (products: Product[]) => void;
  createProduct: (newProduct: CreateProduct) => Promise<void>;
  updateProduct: (productId: string, product: CreateProduct) => Promise<void>;
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
  getProductsByCategory: (
    page: number,
    limit: number,
    category: string
  ) => Promise<ProductResponse>;
  getProductsForMen: (page: number, limit: number) => Promise<ProductResponse>;
  getProductsForKids: (page: number, limit: number) => Promise<ProductResponse>;
  getProductsByOtherCategories: (
    page: number,
    limit: number,
    otherCategory: string
  ) => Promise<ProductResponse>;
  getProductsByMenCategory: (
    page: number,
    limit: number,
    category: string
  ) => Promise<ProductResponse>;
}

export interface Product {
  _id: string; // watch this
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  isOutOfStock: boolean;
  weight: number;
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
