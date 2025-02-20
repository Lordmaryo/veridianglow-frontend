import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { sortingOptions } from "../data/product";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const ForMen = () => {
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const { getProductsForMen } = useProductStore();

  const { data } = useQuery({
    queryKey: ["for men", page, limit],
    queryFn: () => getProductsForMen(page, limit),
  });

  const [sortedProducts, setSortedProducts] = useState(data?.products || []);
  const sortOptions = sortingOptions();

  useEffect(() => {
    if (data) {
      setSortedProducts(sortOptions[0].sortFunction(data));
    }
  }, [data]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    if (selectedIndex === "") return;

    const selectedOption = sortOptions[Number(selectedIndex)];
    if (data) {
      setSortedProducts(selectedOption.sortFunction(data));
    }
  };

  const hasMoreProducts = (data?.pagination?.totalProducts ?? 0) > limit;

  const handlePageLimit = () => {
    if (hasMoreProducts && limit > 10) {
      setPage((prevPage) => prevPage + 1);
    }
    setLimit((prevLimit) => prevLimit + 10);
  };

  return (
    <div>
      <div className="relative">
        <div className="sm:h-80 h-60 w-full">
          <img
            src="/mencategory.webp"
            className="object-cover scale-x-[-1] w-full h-full"
          />
        </div>
        <div className="bg-[#00000092] w-full sm:h-80 h-60 absolute top-0" />
        <div className="text-white px-4 absolute bottom-6 flex justify-between items-end w-full">
          <h3 className="capitalize font-semibold md:text-5xl sm:text-4xl text-2xl">
            For Men
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
          Showing <span className="font-bold">{data?.products.length}</span> of{" "}
          <span className="font-bold">
            {data?.pagination.totalProducts} results
          </span>
        </p>
        <select
          className="text-sm w-36 sm:w-56 px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700"
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
      <div className="flex flex-col gap-4 max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-2 place-items-center sm:flex gap-4 flex-wrap">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {hasMoreProducts && (
          <button
            onClick={handlePageLimit}
            className="font-bold hover:underline"
          >
            Show more ...
          </button>
        )}
      </div>
    </div>
  );
};

export default ForMen;
