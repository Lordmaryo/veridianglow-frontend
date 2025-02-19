import ProductCard from "./ProductCard";
import { useProductStore } from "../stores/useProductStore";
import { useQuery } from "@tanstack/react-query";

const RelatedProducts = ({ category }: { category: string }) => {
  const { getRelatedProduct } = useProductStore();

  const { data: relatedproducts, error } = useQuery({
    queryKey: ["related-products", category],
    queryFn: () => getRelatedProduct(category),
  });

  if (error) console.error(error);
  return (
    <div className="mt-10">
      <h3 className="md:text-2xl text-xl font-medium">Related Products</h3>
      <div className="pt-4 grid grid-cols-2 place-content-center sm:flex flex-wrap justify-center sm:justify-normal gap-4">
        {relatedproducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
