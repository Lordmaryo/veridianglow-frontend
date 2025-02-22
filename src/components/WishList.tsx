import { useUserStore } from "../stores/useUserStore";
import ProductCard from "./ProductCard";

const WishList = () => {
  const { wishlists } = useUserStore();

  return (
    <div>
      <h2 className="font-bold text-xl my-4">
        Wishlists {wishlists?.length! > 0 && <>({wishlists?.length})</>}
      </h2>
      {wishlists?.length === 0 ? (
        <p className="text-zinc-500 text-center">No wishlists yet</p>
      ) : (
        <div className="grid grid-cols-2 place-items-center sm:flex gap-4 flex-wrap">
          {wishlists?.map((wishlistProduct) => (
            <ProductCard
              key={wishlistProduct.productId}
              product={{ ...wishlistProduct, _id: wishlistProduct.productId }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
