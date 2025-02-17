import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatCurrency } from "../utils/utils";
import StarRating from "../components/StarRating";
import { Heart, Minus, Plus } from "lucide-react";
import Description from "../components/Description";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetail = () => {
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
            className="pt-20 hidden lg:block xl:h-screen"
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
          {product.stock < 3 && (
            <p>
              only <span>{product.stock}</span> in stock
            </p>
          )}
          <div className="flex justify-between items-center p-1 border border-accent w-20">
            <button className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <Minus />
            </button>
            <p className="font-bold">2</p>
            <button className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <Plus />
            </button>
          </div>
          <div className="flex items-center">
            <button className="w-full py-2 bg-accent text-textOnAccent rounded-l-lg hover:opacity-85 transition">
              Add to cart {"₦85,000.00"}
            </button>
            <button className="border border-accent p-2">
              <Heart />
            </button>
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
