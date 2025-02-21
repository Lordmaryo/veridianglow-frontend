import { create } from "zustand";

interface UseLocationStoreProps {
  selectedState: string;
  selectedCity: string;
  setSelectedState: (state: string) => void;
  setSelectedCity: (city: string) => void;
}

export const useLocationStore = create<UseLocationStoreProps>((set) => ({
  selectedState: "",
  selectedCity: "",
  setSelectedState: (state) => set({ selectedState: state, selectedCity: "" }),
  setSelectedCity: (city) => set({ selectedCity: city }),
}));
