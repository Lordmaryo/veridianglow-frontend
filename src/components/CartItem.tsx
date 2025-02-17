// import { CartProducts } from "../types/types";

import { Minus, Plus, X } from "lucide-react";
import { formatCurrency } from "../utils/utils";

// type CartItemProp = {
//   item: CartProducts;
// };

const CartItem = () => {
  return (
    <div className="flex justify-between items-start py-4">
      <div className="flex gap-4">
        <div className="shrink-0">
          <img
            className="sm:h-32 h-36 w-24 rounded object-cover"
            src={"/logo.png"}
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold capitalize">
            Refreshing body moisturizer
          </h3>
          <p className="font-bold capitalize">Body serum</p>
          <div className="sm:text-base text-sm flex flex-wrap items-center gap-2 mt-2">
            {
              //   product.price !== 0 &&
              <p className="text-zinc-500 line-through">
                {formatCurrency(200)}
              </p>
            }
            <p className="font-semibold">{formatCurrency(150)}</p>
          </div>
          <div className="flex justify-between items-center p-1 border border-accent w-20">
            <button className="inline-flex h-3 w-3 shrink-0 items-center justify-center">
              <Minus />
            </button>
            <p className="font-bold text-sm">2</p>
            <button className="inline-flex h-3 w-3 shrink-0 items-center justify-center">
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <button className="p-2 border rounded-md" title="Remove this product">
        <X />
      </button>
    </div>
  );
};
export default CartItem;
