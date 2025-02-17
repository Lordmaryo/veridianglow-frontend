import { ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

const Cart = ({
  setToggleCart,
}: {
  setToggleCart: (toggleCart: boolean) => void;
}) => {
  return (
    <div className="fixed top-0 right-0 sm:w-[460px] w-full h-screen bg-white flex flex-col">
      <div className="px-4 py-2 w-full bg-white font-bold flex items-center justify-between border-b">
        <span>Shopping Cart</span>
        <button className="p-2" onClick={() => setToggleCart(false)}>
          <ArrowRight />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className="px-4 py-4 bg-white border-t shadow-md">
        <div className="flex justify-between font-bold text-lg">
          <span>Sub total:</span>
          <span>$99.99</span>
        </div>
        <p className="text-zinc-500 text-sm py-2">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
        <button className="transition mt-4 w-full bg-accent hover:opacity-85 text-white py-2 rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
