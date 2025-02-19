import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import { ChangeEvent, useEffect, useState } from "react";
import { sortingOptions } from "../data/product";

const Shop = () => {
  const { getUnarchivedProducts } = useProductStore();
  const page = 1;
  const limit = 10;

  const { data } = useQuery({
    queryKey: ["shop-products", page, limit],
    queryFn: () => getUnarchivedProducts(page, limit),
  });

  const [sortedProducts, setSortedProducts] = useState(data?.products || []);
  const sortOptions = sortingOptions();

  useEffect(() => {
    if (data != undefined) setSortedProducts(sortOptions[0].sortFunction(data));
  }, [data]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    if (selectedIndex === "") return;

    const selectedOption = sortOptions[Number(selectedIndex)];
    if (data) {
      setSortedProducts(selectedOption.sortFunction(data));
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="sm:h-80 h-60 w-full">
          <img
            src="/shop.jpeg"
            className="object-cover object-top scale-x-[-1] w-full h-full"
          />
        </div>
        <div className="bg-[#00000092] w-full sm:h-80 h-60 absolute top-0" />
        <div className="text-white px-4 absolute bottom-4 flex justify-between items-end w-full">
          <h3 className="font-semibold md:text-5xl sm:text-4xl text-2xl">
            Shop
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <Link to={"/"}>Home</Link>
            <ChevronRight />
            <Link to={"/shop"}>Shop</Link>
          </div>
        </div>
      </div>
      <div className="px-4 flex justify-between items-center gap-4 text-sm">
        <p className="py-2 text-sm">
          Showing <span className="font-bold">1-{limit}</span> of{" "}
          <span className="font-bold">{data?.products.length} results</span>
        </p>
        <select
          className="w-36 px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700"
          onChange={handleSortChange}
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={index}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
      <hr className="w-full border-black pt-10 px-4" />
      <div className="grid grid-cols-2 place-items-center sm:flex gap-4 px-4 mx-auto flex-wrap max-w-[1200px]">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
// TODO - handle pagination and limits
