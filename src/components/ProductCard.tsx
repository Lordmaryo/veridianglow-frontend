import { Link } from "react-router-dom";
import { formatCurrency, toSlug } from "../utils/utils";
import StarRating from "./StarRating";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Wishlists } from "../types/userTypes";
import { truncate } from "lodash";
import { Product } from "../types/ProductTypes";

type ProductCardProps = {
  product: Product | Wishlists;
  containerWidth?: string;
};

const ProductCard = ({
  product,
  containerWidth = "w-full",
}: ProductCardProps) => {
  if (!product) return <ProductCardSkeleton />;
  return (
    <Link
      to={`/shop/${toSlug(product.name)}-${(product as Product)._id}`}
      className="relative"
    >
      {"isOutOfStock" in product && product.isOutOfStock && (
        <div className="font-bold absolute text-white p-1 bg-red-400 text-xs">
          Out of Stock
        </div>
      )}
      <div
        className={`rounded-sm border border-zinc-300 hover:border-[#ebc9de] hover:border-2 sm:w-56 ${containerWidth} sm:h-[21rem] h-80 p-2`}
      >
        <div className="sm:h-52 h-48 mx-auto w-[97%] rounded-md">
          <img
            src={product.image}
            className="object-cover w-full h-full"
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="space-y-1 px-1">
          <p className="text-sm font-bold">{truncate(product.name)}</p>
          <div className="sm:text-base text-sm flex flex-wrap items-center gap-2 mt-2">
            {product.price !== 0 && (
              <p className="text-zinc-500 line-through">
                {formatCurrency(product.price)}
              </p>
            )}
            <p className="font-semibold">
              {formatCurrency(product.discountPrice)}
            </p>
          </div>
          <div className="mt-2">
            <StarRating rating={product.averageRating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
