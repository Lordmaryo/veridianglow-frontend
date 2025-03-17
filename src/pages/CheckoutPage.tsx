import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { usePaymentStore } from "../stores/usePaymentStore";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { isFormComplete, validatePhoneNumber } from "../utils/paymentUtils";
import OrderPayment from "../components/OrderPayment";
import { Coupon } from "../types/couponType";
import CouponInput from "../components/CouponInput";
import DeliveryDetailsForm from "../components/DeliveryDetailsForm";

/**
 * Checkout Page Logic
 *
 * How the checkout logic was done was that before you try to checkout you have
 * to be authenticated to prevent fraudulent activities from taking place. there's
 * a useEffect that monitors cart changes and syncs to database every time a cart changes when user is
 * authenticated. so the cart is being mapped on the backend when you trigger a checkout. The database
 * uses the latest cart updates to calculate everything sending you responses that includes the totalAmount
 * @component
 */
const CheckoutPage = () => {
  const { resetReinitializeFlag, shouldReinitializeCheckout, cart } =
    useCartStore();
  const { user } = useAuthStore();
  const { initializePayment, calculateOrderDetails, detailsResponse } =
    usePaymentStore();
  const { selectedState, selectedCity } = useLocationStore();
  const [couponCode, setCouponCode] = useState<Coupon["code"]>("");
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);

  const handleCheckboxChange = () => {
    setShipToDifferentAddress((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      location: !shipToDifferentAddress
        ? {
            street: "",
            city: "",
            state: "",
            country: "Nigeria",
            buildingType: "",
            zipCode: "",
          }
        : {
            street: user?.address.street || "",
            city: user?.address.city || selectedCity,
            state: user?.address.state || selectedState,
            country: "Nigeria",
            buildingType: user?.address.buildingType || "",
            zipCode: user?.address.zipCode || "",
          },
    }));
  };

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
    if (
      (shouldReinitializeCheckout && isFormDataComplete) ||
      isFormDataComplete ||
      (isFormDataComplete && couponCode.trim().length === 10)
    ) {
      calculateOrderDetails({
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        couponCode,
      });

      resetReinitializeFlag();
    }
  }, [
    shouldReinitializeCheckout,
    isFormDataComplete,
    cart,
    couponCode.trim().length === 10,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await calculateOrderDetails({
      location: formData.location,
      phoneNumber: formData.phoneNumber,
      couponCode,
    });

    resetReinitializeFlag();
  };

  const handlePayment = async () => {
    if (!detailsResponse) {
      throw new Error("Fill in required order details to procceed");
    }
    await initializePayment({
      location: formData.location,
      couponCode,
      orderNote: formData.additionalNote,
      phoneNumber: formData.phoneNumber,
      deliveryFee: detailsResponse?.deliveryFee,
      discountedTotal: detailsResponse?.discountedTotal,
      subtotal: detailsResponse?.subtotal,
      tax: detailsResponse?.tax,
      totalAmount: detailsResponse?.totalAmount,
    });
  };

  const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);

  return (
    <div className="min-h-screen p-4 lg:flex gap-6 justify-between items-start mt-4">
      <div className="lg:w-1/2 mb-4">
        <CouponInput couponCode={couponCode} setCouponCode={setCouponCode} />

        <h2 className="text-xl text-zinc-700 font-semibold mb-4">
          Delivery details
        </h2>
        <DeliveryDetailsForm
          formData={formData}
          //@ts-ignore
          setFormData={setFormData}
          shipToDifferentAddress={shipToDifferentAddress}
          handleCheckboxChange={handleCheckboxChange}
          isPhoneNumberValid={isPhoneNumberValid}
          handleSubmit={handleSubmit}
        />
      </div>

      <OrderPayment
        handlePayment={handlePayment}
        isFormDataComplete={isFormDataComplete}
      />
    </div>
  );
};

export default CheckoutPage;
