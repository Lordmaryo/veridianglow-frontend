import { usePaymentStore } from "../stores/usePaymentStore";
import { Loader, Lock } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const PaystackPayNow = ({
  isFormDataComplete,
  handlePayment,
}: {
  handlePayment: () => Promise<void>;
  isFormDataComplete: boolean;
}) => {
  const { shouldReinitializeCheckout } = useCartStore();
  const { detailsResponse, loading } = usePaymentStore();

  const handlePaymentActions = async () => {
    await handlePayment();
  };

  return (
    <button
      disabled={
        shouldReinitializeCheckout ||
        detailsResponse?.totalAmount === undefined ||
        loading ||
        !isFormDataComplete
      }
      onClick={handlePaymentActions}
      className="disabled:opacity-50 disabled:hover:opacity:40 mt-10 flex gap-2 bg-accent w-full justify-center items-center py-3 rounded-md hover:opacity-85 transition"
    >
      {loading ? (
        <div className="flex flex-row justify-center items-center gap-2">
          <Loader size={20} className="animate-spin" aria-hidden={true} />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-2">
          <Lock />
          <span>Pay Now</span>
        </div>
      )}
    </button>
  );
};

export default PaystackPayNow;
