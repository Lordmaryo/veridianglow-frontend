export interface useUserStoreProps {
  loading: boolean;
  address: AddressResponse | Address | null;
  addAddress: (newAddres: Address) => void;
  editAddress: (address: Address) => void;
  loadAddress: () => void;
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
