import { Minus, Plus, X } from "lucide-react";
import { formatCurrency, toSlug } from "../utils/utils";
import { CartProducts } from "../types/types";
import { Link } from "react-router-dom";

type CartItemProp = {
  item: CartProducts;
  removeAllFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setToggleCart?: (toggleCart: boolean) => void;
};

const CartItem = ({
  item,
  updateQuantity,
  removeAllFromCart,
  setToggleCart,
}: CartItemProp) => {
  return (
    <div className="flex justify-between items-start py-4">
      <div className="flex gap-4">
        <Link
          onClick={() => setToggleCart && setToggleCart(false)}
          to={`/shop/${toSlug(item.name)}-${item.id}`}
          className="shrink-0"
        >
          <img
            className="sm:h-32 h-32 w-20 rounded object-cover"
            src={item.image}
          />
        </Link>
        <div className="space-y-2 pr-2">
          <Link
            onClick={() => setToggleCart && setToggleCart(false)}
            to={`/shop/${toSlug(item.name)}-${item.id}`}
            className="font-semibold capitalize"
          >
            {item.name}
          </Link>
          <p className="font-bold capitalize">{item.category}</p>
          <div className="sm:text-base text-sm flex flex-wrap items-center gap-2 mt-2">
            {item.price !== 0 && (
              <p className="text-zinc-500 line-through">
                {formatCurrency(item.price)}
              </p>
            )}
            <p className="font-semibold">
              {formatCurrency(item.discountPrice)}
            </p>
          </div>
          <div className="flex justify-between items-center p-1 border border-accent w-20">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="inline-flex h-3 w-3 shrink-0 items-center justify-center"
            >
              <Minus />
            </button>
            <p className="font-bold text-sm">{item.quantity}</p>
            <button
              disabled={item.quantity + 1 > item.stock}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="inline-flex h-3 w-3 shrink-0 items-center justify-center disabled:opacity-50"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => removeAllFromCart(item.id)}
        className="p-2 border rounded-md"
        title="Remove this product"
      >
        <X />
      </button>
    </div>
  );
};
export default CartItem;
