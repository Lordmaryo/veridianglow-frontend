import { Loader } from "lucide-react";
import LocationSelector from "../components/LocationSelector";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { usePaymentStore } from "../stores/usePaymentStore";
import { FormEvent, useEffect, useState } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { isFormComplete } from "../utils/paymentUtils";
import OrderPayment from "../components/OrderPayment";
import { Coupon } from "../types/types";

const CheckoutPage = () => {
  const { cart, resetReinitializeFlag, shouldReinitializeCheckout } =
    useCartStore();
  const { user } = useAuthStore();
  const { loading, initializeCheckout, paymentResponse } = usePaymentStore();
  const { selectedState, selectedCity } = useLocationStore();
  const [couponCode, setCouponCode] = useState<Coupon["code"]>("");

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    location: {
      street: user?.address.street || "",
      city: user?.address.city || selectedCity,
      state: user?.address.state || selectedState,
      country: "Nigeria",
      buildingType: user?.address.buildingType || "",
      zipCode: user?.address.zipCode || "",
    },
    phoneNumber: "",
    additionalNote: "",
  });
  const isFormDataComplete = isFormComplete(formData);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: selectedCity,
        state: selectedState,
      },
    }));
  }, [selectedCity, selectedState]);

  useEffect(() => {
    if (shouldReinitializeCheckout && isFormDataComplete && paymentResponse) {
      const products = cart.map((item) => ({
        productName: item.name,
        productId: item.id,
        quantity: item.quantity,
        price: item.discountPrice,
      }));

      initializeCheckout({
        products,
        location: formData.location,
        currency: "NGN",
        phoneNumber: formData.phoneNumber,
        couponCode,
        orderNote: formData.additionalNote,
        email: formData.email,
      });

      resetReinitializeFlag();
    }
  }, [formData, shouldReinitializeCheckout]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const products = cart.map((item) => ({
      productName: item.name,
      productId: item.id,
      quantity: item.quantity,
      price: item.discountPrice,
    }));

    await initializeCheckout({
      products,
      location: formData.location,
      currency: "NGN",
      phoneNumber: formData.phoneNumber,
      couponCode,
      orderNote: formData.additionalNote,
      email: formData.email,
    });

    resetReinitializeFlag();
  };

  return (
    <div className="min-h-screen p-4 lg:flex gap-6 justify-between items-start mt-4">
      <div className="lg:w-1/2 mb-4">
        <div className="flex flex-col mb-10">
          <label htmlFor="coupon-code">Have any coupon? add here</label>
          <div className="relative">
            <input
              id="coupon-code"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              required
              placeholder="Coupon or gift code"
              className="bg-zinc-200 w-full outline-none p-2 rounded-md"
            />
          </div>
        </div>
        <h2 className="text-xl text-zinc-700 font-semibold mb-4">
          Delivery details
        </h2>
        <form
          className="space-y-4"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="email">Email *</label>
              <button className="underline" type="button">
                Logout
              </button>
            </div>
            <div className="relative">
              <input
                id="email"
                type="text"
                value={formData.email}
                required
                readOnly
                placeholder="johndoe@gmail.com"
                className="bg-zinc-200 w-full outline-none p-2 rounded-md cursor-not-allowed opacity-40"
              />
            </div>
          </div>

          <div className="flex item-center gap-2">
            <input id="change-address" type="checkbox" className="p-2 w-4" />
            <label htmlFor="change-address">Ship to a different address?</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName">Firstname *</label>
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                  placeholder="John"
                  className="bg-zinc-200 w-full outline-none p-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname">Lastname *</label>
              <div className="relative">
                <input
                  id="lastname"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                  placeholder="Doe"
                  className="bg-zinc-200 w-full outline-none p-2 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col opacity-40">
            <label htmlFor="country">Country</label>
            <div className="relative">
              <input
                id="country"
                type="text"
                required
                readOnly
                value={formData.location.country}
                placeholder="Nigeria"
                className="bg-zinc-200 w-full outline-none p-2 rounded-md cursor-not-allowed"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <LocationSelector
              defaultState={formData.location.state}
              defaultCity={formData.location.city}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street">House Number And Street Name*</label>
            <div className="relative">
              <input
                id="street"
                type="text"
                value={formData.location.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, street: e.target.value },
                  })
                }
                required
                placeholder="123 street"
                className="bg-zinc-200 w-full outline-none p-2 rounded-md"
              />
              <input
                id="apartment-suite"
                type="text"
                value={formData.location.buildingType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      buildingType: e.target.value,
                    },
                  })
                }
                placeholder="Apartment, Suite, Unit ETC (Optional)"
                className="bg-zinc-200 w-full outline-none p-2 rounded-md mt-4"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip-code">Zip code *</label>
            <input
              id="zip-code"
              type="text"
              value={formData.location.zipCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, zipCode: e.target.value },
                })
              }
              required
              placeholder="1000"
              className="bg-zinc-200 w-full outline-none p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone number *</label>
            <input
              id="phone"
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
              placeholder="08123456789"
              className="bg-zinc-200 w-full outline-none p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="additional-note">Additional Notes</label>
            <textarea
              id="additional-note"
              value={formData.additionalNote}
              onChange={(e) =>
                setFormData({ ...formData, additionalNote: e.target.value })
              }
              placeholder="Leave at the door..."
              className="bg-zinc-200 h-28 w-full outline-none py-2 px-4 rounded-md"
            />
          </div>

          <button
            disabled={!isFormDataComplete}
            className="disabled:opacity-50 disabled:hover:opacity:40 w-full py-3 bg-accent hover:opacity-85 text-textOnAccent font-semibold rounded-md"
          >
            {loading ? (
              <div className="flex flex-row justify-center items-center gap-2">
                <Loader size={20} className="animate-spin" aria-hidden={true} />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Confirm</span>
            )}
          </button>
        </form>
      </div>

      {/* Orders */}
      <OrderPayment />
    </div>
  );
};

export default CheckoutPage;
