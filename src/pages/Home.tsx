import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import { useProductStore } from "../stores/useProductStore";

const Home = () => {
  const { fetchFeauturedProduct } = useProductStore();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeauturedProduct,
  });

  return (
    <div>
      <Hero />
      <FeaturedProducts product={products} />
    </div>
  );
};

export default Home;
