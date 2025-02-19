import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import { useProductStore } from "../stores/useProductStore";
import ShopByCategory from "../components/ShopByCategory";

const Home = () => {
  const { fetchFeauturedProduct } = useProductStore();

  const { data: products } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeauturedProduct,
  });

  return (
    <div>
      <Hero />
      <FeaturedProducts product={products} />
      <ShopByCategory />
    </div>
  );
};

export default Home;
