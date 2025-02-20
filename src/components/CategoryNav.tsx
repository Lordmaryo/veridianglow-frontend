import { Link } from "react-router-dom";
import { NavCategories } from "../data/category";
import { useState } from "react";

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  return (
    <div className="text-sm text-center space-x-4 font-semibold backdrop-blur-2xl px-4 py-2 relative">
      {NavCategories.map((category) => (
        <div
          key={category.href}
          className="relative inline-block"
          onMouseEnter={() => {
            if (timeoutId) clearTimeout(timeoutId);
            setActiveCategory(category.name);
          }}
          onMouseLeave={() => {
            timeoutId = setTimeout(() => setActiveCategory(null), 200);
          }}
        >
          <Link
            to={category.href}
            className="relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1
             before:bg-accent before:transition-all before:duration-300 hover:before:w-full"
          >
            {category.name}
          </Link>

          {category.subcategories && activeCategory === category.name && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg border 
            rounded-b-md w-48 text-left"
            >
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className="block px-4 py-2 hover:text-accent transition"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
