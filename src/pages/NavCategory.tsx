import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import NavPages from "../components/NavPages";

const NavCategory = () => {
  const { mainCategory, otherCategory } = useParams();
  const productMainCategory = mainCategory?.replace(/-/g, " ");
  const productOtherCategory = otherCategory?.replace(/-/g, " ");

  const { getProductsByDifferentCategories } = useProductStore();

  return (
    <div>
      <NavPages
        title={productMainCategory || ""}
        imageSrc="/planeskincare.webp"
        fetchProducts={(page, limit, productMainCategory) =>
          getProductsByDifferentCategories(page, limit, productMainCategory, "")
        }
        queryKey={mainCategory || ""}
        mainCategory={productMainCategory || ""}
        otherCategory={productOtherCategory}
      />
    </div>
  );
};

export default NavCategory;
