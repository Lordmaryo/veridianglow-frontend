import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import ProductCard from "../components/ProductCard";
import { ChangeEvent, useEffect, useState } from "react";
import { sortingOptions } from "../data/product";
import { ProductResponse } from "../types/types";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["searchResults", query, page, limit],
    queryFn: async () => {
      const response = await axios.get<ProductResponse>(
        `/product/search?search=${query}?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    enabled: !!query,
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
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {isFetching && <p>Loading...</p>}

      {data?.products.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="">
          <div className="my-10 px-4 flex justify-between items-center gap-4 text-sm">
            <p className="py-2 text-sm">
              Showing <span className="font-bold">{data?.products.length}</span>{" "}
              of{" "}
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
      )}
    </div>
  );
};

export default SearchResults;
