import { Lock } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/utils";
import { usePaymentStore } from "../stores/usePaymentStore";

const OrderPayment = () => {
  const { cart, subTotal, shouldReinitializeCheckout } = useCartStore();
  const { paymentResponse } = usePaymentStore();

  return (
    <div className="lg:w-[40%] ">
      <div className="shadow-md p-4 rounded-md">
        <h2 className="text-lg text-zinc-700 font-semibold mb-4">
          Your orders
        </h2>
        <div className="space-y-10">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-2">
              <div className="h-28 w-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-sm">
                <h4>{item.name}</h4>
                <p>x{item.quantity}</p>
                {item.price > 0 && (
                  <p className="font-semibold line-through text-zinc-500">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                )}
                <p className="font-semibold">{formatCurrency(item.total)}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6" />
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Subtotal</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>

          {paymentResponse && paymentResponse.discountedTotal > 0 && (
            <div className="flex justify-between items-center gap-4">
              <span className="font-bold">Discount</span>
              <span>-{formatCurrency(paymentResponse.discountedTotal)}</span>
            </div>
          )}

          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Shipping</span>
            <span>
              {paymentResponse && paymentResponse.deliveryFee
                ? formatCurrency(paymentResponse.deliveryFee)
                : "Confirm shipping address"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Total</span>
            <span>
              {paymentResponse && paymentResponse.totalAmount
                ? formatCurrency(paymentResponse.totalAmount)
                : formatCurrency(subTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-200 shadow-md mt-4 flex flex-col items-center">
        <p>Paystack (Bank Transfer, Debit/Credit Cards, USSD)</p>
        <div className="w-72 pt-4">
          <img
            src="./poweredbypaystack.png"
            alt="powered by paystack"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm py-4">
          After clicking “Pay now”, you will be redirected to Paystack to
          complete your purchase securely.
        </p>
        <button
          disabled={shouldReinitializeCheckout}
          className="disabled:opacity-50 disabled:hover:opacity:40 mt-10 flex gap-2 bg-accent w-full justify-center items-center py-3 rounded-md hover:opacity-85 transition"
        >
          <Lock />
          <span>Pay Now</span>
        </button>
      </div>
    </div>
  );
};

export default OrderPayment;
