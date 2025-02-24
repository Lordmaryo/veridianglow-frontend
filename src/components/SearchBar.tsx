import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import { Product, ProductResponse } from "../types/types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toSlug, truncateWord } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({
  setToggleSearch,
}: {
  setToggleSearch?: (toggleSearch: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;
      const response = await axios.get<ProductResponse>(
        `/product/search?search=${debouncedQuery}&page=1&limit=5`
      );
      return response.data;
    },
    enabled: !!debouncedQuery,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
    setQuery("");
    setToggleSearch!(false);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <FaMagnifyingGlass className="absolute left-2 bottom-2" />
        <input
          type="search"
          placeholder="SEARCH PRODUCTS..."
          className="outline-none pl-8 py-1 w-full rounded-sm border border-zinc-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {data?.products.length! > 0 && (
        <ul className="z-20 absolute left-0 w-full bg-white border rounded shadow-md">
          {data?.products.map((product: Product) => (
            <Link
              onClick={() => setQuery("")}
              to={`/shop/${toSlug(product.name)}-${product._id}`}
            >
              <li
                key={product._id}
                className="p-2 hover:text-accent cursor-pointer"
                onClick={() => setQuery(product.name)}
              >
                {truncateWord(product.name, 35)}
              </li>
            </Link>
          ))}
          <Link
            onClick={() => {
              setQuery("");
              setToggleSearch!(false);
            }}
            to={`/search?q=${debouncedQuery}`}
          >
            <li className="text-zinc-700 text-center pb-2 underline hover:text-accent">
              View all results
            </li>
          </Link>
        </ul>
      )}
      {isFetching && <p className="p-2 bg-white">Loading...</p>}
    </form>
  );
};

export default SearchBar;
