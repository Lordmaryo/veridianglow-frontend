import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/utils";
import { usePaymentStore } from "../stores/usePaymentStore";
import PaystackPayNow from "./PaystackPayNow";

const OrderPayment = ({
  isFormDataComplete,
  handlePayment,
}: {
  handlePayment: () => Promise<void>;
  isFormDataComplete: boolean;
}) => {
  const { cart, subTotal } = useCartStore();
  const { detailsResponse } = usePaymentStore();

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
                  loading="lazy"
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

          {detailsResponse && detailsResponse.discountedTotal > 0 && (
            <div className="flex justify-between items-center gap-4">
              <span className="font-bold">Discount</span>
              <span>-{formatCurrency(detailsResponse.discountedTotal)}</span>
            </div>
          )}

          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Shipping</span>
            <span>
              {detailsResponse && detailsResponse.deliveryFee
                ? formatCurrency(detailsResponse.deliveryFee)
                : "Confirm shipping address"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Total</span>
            <span>
              {detailsResponse && detailsResponse.totalAmount
                ? formatCurrency(detailsResponse.totalAmount)
                : formatCurrency(subTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-200 shadow-md mt-4 flex flex-col items-center">
        <p>Paystack (Bank Transfer, Debit/Credit Cards, USSD)</p>
        <div className="w-72 pt-4">
          <img
            loading="lazy"
            src="./poweredbypaystack.png"
            alt="powered by paystack"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm py-4">
          After clicking “Pay now”, you will be redirected to Paystack to
          complete your purchase securely.
        </p>
        <PaystackPayNow
          handlePayment={handlePayment}
          isFormDataComplete={isFormDataComplete}
        />
      </div>
    </div>
  );
};

export default OrderPayment;
