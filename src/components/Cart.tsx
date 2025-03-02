import { ArrowRight, ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/utils";
import { useAuthStore } from "../stores/useAuthStore";

const Cart = ({
  setToggleCart,
}: {
  setToggleCart: (toggleCart: boolean) => void;
}) => {
  const { cart, updateQuantity, removeAllFromCart, subTotal } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/signin", { state: { from: "/checkout" } });
    }
    setToggleCart(false);
  };

  return (
    <div className="fixed top-0 right-0 sm:w-[460px] w-full h-screen bg-white flex flex-col">
      <div className="px-4 py-2 w-full bg-white font-bold flex items-center justify-between border-b">
        <span>Shopping Cart</span>
        <button className="p-2" onClick={() => setToggleCart(false)}>
          <ArrowRight />
        </button>
      </div>
      {cart.length === 0 ? (
        <EmptyCartUI setCloseCart={setToggleCart} />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          {cart.map((item) => (
            <CartItem
              setToggleCart={setToggleCart}
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeAllFromCart={removeAllFromCart}
            />
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="px-4 py-4 bg-white border-t shadow-md">
          <div className="flex justify-between font-bold text-lg">
            <span>Sub total:</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>
          <p className="text-zinc-500 text-sm py-2">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
          <button
            onClick={handleCheckout}
            className="transition mt-4 w-full bg-accent hover:opacity-85 text-white py-2 rounded-md"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

const EmptyCartUI = ({
  setCloseCart,
}: {
  setCloseCart: (event: boolean) => void;
}) => (
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      onClick={() => setCloseCart(false)}
      className="mt-4 rounded-md bg-accent px-4 py-2 text-white transition-colors hover:bg-opacity-85"
      to="/shop"
    >
      Start Shopping
    </Link>
  </div>
);
