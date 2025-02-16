import { Archive, Ellipsis, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { Product } from "../types/types";
import LoadingSpinner from "./LoadingSpinner";
import { formatCurrency } from "../utils/utils";

interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

const ProductList = ({ products, isLoading }: ProductListProps) => {
  const { deleteProduct, toggleFeauturedProduct, toggleArchivedProduct } =
    useProductStore();

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="max-w-[600px] h-screen w-full mt-10 mb-4 px-4">
      <thead className="bg-zinc-200 uppercase font-bold">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Product
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Stock
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Category
          </th>

          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Featured
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Archived
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-zinc-300 divide-y divide-gray-700">
        {products?.map((product) => (
          <tr key={product?._id} className="hover:bg-gray-400">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={product?.image}
                    alt={product?.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium">{product?.name}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-bold">{product.stock}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm">
                {formatCurrency(product.discountPrice)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm">{product?.category}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() =>
                  product?._id && toggleFeauturedProduct(product?._id)
                }
                className={`p-1 rounded-full ${
                  product?.isFeatured
                    ? "bg-yellow-400 text-gray-900"
                    : "transparent"
                } hover:bg-yellow-500 transition-colors duration-200`}
              >
                <Star className="h-5 w-5" />
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() =>
                  product?._id && toggleArchivedProduct(product?._id)
                }
                className={`p-1 rounded-full ${
                  product?.isArchived
                    ? "bg-accent text-gray-900"
                    : "transparent"
                } hover:bg-accent transition-colors duration-200`}
              >
                <Archive className="h-5 w-5" />
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                // onClick={() => product?._id && deleteProduct(product?._id)}
                className="hover:bg-zinc-500 py-1 px-2 rounded-md"
              >
                {/* <Trash className="h-5 w-5" /> */}
                <Ellipsis className="h-5 w-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default ProductList;
