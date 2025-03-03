import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatCurrency } from "../utils/utils";
import StarRating from "../components/StarRating";
import { Heart, Minus, Plus } from "lucide-react";
import Description from "../components/Description";
import RelatedProducts from "../components/RelatedProducts";
import { useCartStore } from "../stores/useCartStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useUserStore } from "../stores/useUserStore";
import { Wishlists } from "../types/userTypes";

const ProductDetail = () => {
  const { user } = useAuthStore();
  const { wishlists, addToWishlist, removeFromWishlist } = useUserStore();
  const { addToCart, cart, updateQuantity } = useCartStore();
  const { productSlug } = useParams();
  const { getProductById } = useProductStore();

  const productId = productSlug?.split("-").pop();
  if (!productId) {
    throw new Error("Product id not found");
  }

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const productExists = cart.some((item) => item.id === product?._id);
  const currentProductIndex = cart.findIndex(
    (item) => item.id === product?._id
  );

  // wishlists
  const existInWishlist = wishlists?.some(
    (item) => item.productId === product?._id
  );

  const wishlistsProduct: Wishlists = {
    productId: product?._id || "",
    name: product?.name || "",
    averageRating: product?.averageRating || 0,
    image: product?.image || "",
    price: product?.price || 0,
    discountPrice: product?.discountPrice || 0,
  };

  const handleWishList = () => {
    if (!existInWishlist) {
      addToWishlist(wishlistsProduct);
    } else {
      removeFromWishlist(wishlistsProduct);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) console.error(error);
  if (!product) return <LoadingSpinner />;
  return (
    <div className="pt-10 px-4">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div>
          <div className="lg:w-[600px] w-full">
            <img
              src={product?.image}
              alt={product?.name}
              className="object-cover w-full h-full"
            />
          </div>
          <section
            id="description"
            className="pt-20 hidden lg:block xl:min-h-screen"
          >
            <Description product={product} />
          </section>
        </div>
        <div className="space-y-4 max-w-2xl md:sticky top-44">
          <p className="font-semibold text-zinc-500">{product?.category}</p>
          <h1 className="font-bold sm:text-3xl text-2xl capitalize">
            {product?.name}
          </h1>
          <div className="flex gap-4 items-center text-xl">
            {product?.price !== 0 && (
              <span className="line-through">
                {formatCurrency(product?.price)}
              </span>
            )}
            <span>{formatCurrency(product?.discountPrice)}</span>
          </div>
          <StarRating rating={product.averageRating} iconSize={30} />
          <div className="my-2">
            <a href="#description" className="underline">
              Find out more about this product
            </a>
          </div>
          {product.stock < 3 &&
            (product.stock < 1 ? (
              <p className="text-red-500 font-semibold">Out of stock</p>
            ) : (
              <p className="text-red-500 font-semibold">
                only <span>{product.stock}</span> in stock
              </p>
            ))}
          {!productExists ? (
            <div className="flex justify-between items-center p-1 border border-accent w-20">
              <button className="inline-flex h-5 w-5 shrink-0 items-center justify-center disabled:opacity-40">
                <Minus />
              </button>
              <p className="font-bold">1</p>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock < 1}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center disabled:opacity-40"
              >
                <Plus />
              </button>
            </div>
          ) : (
            cart
              .filter((item) => item.id === product._id)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-1 border border-accent w-20"
                >
                  <button
                    disabled={item.quantity === 1}
                    onClick={() =>
                      updateQuantity(product._id, item.quantity - 1)
                    }
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center disabled:opacity-40"
                  >
                    <Minus />
                  </button>
                  <p className="font-bold">{item.quantity || "1"}</p>
                  <button
                    disabled={item.quantity + 1 > product.stock}
                    onClick={() =>
                      updateQuantity(product._id, item.quantity + 1)
                    }
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center disabled:opacity-40"
                  >
                    <Plus />
                  </button>
                </div>
              ))
          )}
          <div className="flex items-center">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock < 1}
              className="w-full py-2 bg-accent text-textOnAccent rounded-l-lg hover:opacity-85 transition disabled:opacity-50"
            >
              Add to cart{" "}
              {formatCurrency(
                productExists
                  ? cart[currentProductIndex].total
                  : product.discountPrice
              )}
            </button>
            <div className="border border-accent">
              <button
                disabled={!user}
                onClick={handleWishList}
                className="disabled:opacity-40 disabled:cursor-not-allowed p-2 hover:bg-[#f872c573] transition rounded-full"
              >
                <Heart
                  className={`text-accent  ${
                    existInWishlist ? "fill-accent text-accent" : ""
                  } `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <section id="description" className="py-10 lg:hidden">
        <Description product={product} />
      </section>
      <div className="pt-10">
        <RelatedProducts category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetail;
