import ReusableProductsPage from "../components/ReusableProductsPage";
import { useProductStore } from "../stores/useProductStore";

const Shop = () => {
  const { getUnarchivedProducts } = useProductStore();

  return (
    <ReusableProductsPage
      title="Shop"
      imageSrc="/shop-image.webp"
      fetchProducts={getUnarchivedProducts}
      queryKey="shop-products"
    />
  );
};

export default Shop;
