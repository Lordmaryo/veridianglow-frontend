import { useEffect } from "react";
import { usePaymentStore } from "../stores/usePaymentStore";
import { VerifyResponse } from "../types/paymentType";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const VerifyPayment = () => {
  const { setLoadingState, setVerifyPaymentResponse } = usePaymentStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const reference = queryParams.get("reference");
    if (!reference) {
      toast.error("Refenrece not found");
      throw new Error("Reference not found");
    }

    const verifyPayment = async (reference: string) => {
      try {
        const { data } = await axios.get<VerifyResponse>(
          `/payment/verify_payment/${reference}`
        );
        setVerifyPaymentResponse(data);
        if (data.status === "success") {
          clearCart();
          navigate("/order/payment-success");
        } else {
          navigate("/order/payment-failed");
        }
      } finally {
        setLoadingState(false);
      }
    };
    verifyPayment(reference);
  }, [navigate]);

  return (
    <div className="min-h-screen p-4">
      Verifying payment... this won't take long
    </div>
  );
};

export default VerifyPayment;
