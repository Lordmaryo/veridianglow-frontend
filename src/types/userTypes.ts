export interface useUserStoreProps {
  loading: boolean;
  users: User[] | null;
  wishlists: Wishlists[] | null;
  address: AddressResponse | null;
  addAddress: (newAddres: Address) => Promise<void>;
  getAllUsers: () => Promise<void>;
  loadAddress: () => void;
  editAddress: (address: Address) => Promise<void>;
  addToWishlist: (product: Wishlists) => void;
  removeFromWishlist: (product: Wishlists) => void;
  getWishlists: () => void;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  buildingType?: string;
}

export interface AddressResponse {
  message: string;
  address: Address;
}

export interface Wishlists {
  productId: string;
  name: string;
  averageRating: number;
  image: string;
  price: number;
  discountPrice: number;
}

export interface User {
  firstName: string;
  lastName: string;
  _id: string;
  email: string;
}
