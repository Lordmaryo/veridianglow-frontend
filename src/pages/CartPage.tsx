import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const CartPage = () => {
  const { cart, updateQuantity, removeAllFromCart, subTotal } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/signin", { state: { from: "/checkout" } });
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto min-h-screen bg-white flex flex-col">
      <h2 className="font-bold lg:text-3xl md:text-2xl text-xl p-4">
        Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <EmptyCartUI />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          {cart.map((item) => (
            <CartItem
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

export default CartPage;

const EmptyCartUI = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-accent px-4 py-2 text-white transition-colors hover:bg-opacity-85"
      to="/shop"
    >
      Start Shopping
    </Link>
  </div>
);
