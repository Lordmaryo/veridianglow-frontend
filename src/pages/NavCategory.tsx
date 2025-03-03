import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ReusableProductsPage from "../components/ReusableProductsPage";

const NavCategory = () => {
  const { mainCategory } = useParams();
  const productCategory = mainCategory?.replace(/-/g, " ");
  const { getProductsByCategory } = useProductStore();

  return (
    <div>
      <ReusableProductsPage
        title={productCategory || ""}
        imageSrc="/planeskincare.webp"
        fetchProducts={(page, limit, productCategory) =>
          getProductsByCategory(page, limit, productCategory || "")
        }
        queryKey={mainCategory || ""}
        category={productCategory}
      />
    </div>
  );
};

export default NavCategory;
