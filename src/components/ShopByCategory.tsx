import { shopByCategory } from "../data/category";
import CategoryCard from "./CategoryCard";

const ShopByCategory = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:flex justify-center">
        {shopByCategory.map((category) => (
          <CategoryCard
            key={category.categoryName}
            href={category.href}
            image={category.image}
            title={category.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
