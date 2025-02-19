import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import { useProductStore } from "../stores/useProductStore";
import ShopByCategory from "../components/ShopByCategory";
import OurMission from "../components/OurMission";
import NewArrivals from "../components/NewArrivals";

const Home = () => {
  const { fetchFeauturedProduct } = useProductStore();
  const { getUnarchivedProducts } = useProductStore();
  const page = 1;
  const limit = 20;

  const { data: products } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeauturedProduct,
  });

  const { data: productData } = useQuery({
    // used same key as shop to utilize cache and prevent refetching from api
    queryKey: ["shop-products", page, limit],
    queryFn: () => getUnarchivedProducts(page, limit),
  });

  return (
    <div>
      <Hero />
      <FeaturedProducts product={products} />
      <ShopByCategory />
      <OurMission />
      <NewArrivals productData={productData} />
    </div>
  );
};

export default Home;
