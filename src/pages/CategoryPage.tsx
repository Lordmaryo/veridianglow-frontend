import { useParams } from "react-router-dom";
import ReusableProductsPage from "../components/ReusableProductsPage";
import { useProductStore } from "../stores/useProductStore";

const CategoryPage = () => {
  const { category } = useParams();
  const { getProductsByCategory } = useProductStore();
  const productCategory = category?.replace(/-/g, " ");

  return (
    <div>
      {" "}
      <ReusableProductsPage
        title={productCategory || ""}
        imageSrc="/planeskincare.webp"
        fetchProducts={(page, limit, category) =>
          getProductsByCategory(page, limit, category || "")
        }
        queryKey={category || ""}
        category={productCategory}
      />
    </div>
  );
};

export default CategoryPage;
