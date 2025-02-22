export interface useUserStoreProps {
  loading: boolean;
  wishlists: Wishlists[] | null;
  address: AddressResponse | Address | null;
  addAddress: (newAddres: Address) => void;
  loadAddress: () => void;
  editAddress: (address: Address) => void;
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
