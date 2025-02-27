import { Archive, Ellipsis, PenLine, Star, Trash } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { Product } from "../types/types";
import { formatCurrency } from "../utils/utils";
import { useState } from "react";
import EditProduct from "./EditProduct";

interface ProductListProps {
  products: Product[] | undefined;
}

const ProductList = ({ products }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleAction, setToggleAction] = useState<string | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [updateProductId, setUpdateProductId] = useState<string | null>(null);
  const { deleteProduct, toggleFeauturedProduct, toggleArchivedProduct } =
    useProductStore();

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleActionMenu = (productId: string) => {
    setToggleAction((prev) => (prev === productId ? null : productId));
  };

  const handleDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
      setToggleAction(null);
    }
  };

  const findProductIndex = products?.findIndex(
    (product) => product._id === updateProductId
  );
  if (updateProductId && products !== undefined)
    return (
      <EditProduct
        product={products[findProductIndex!]}
        onClose={() => setUpdateProductId(null)}
      />
    );
  return (
    <>
      <div className="h-screen w-full mt-10 mb-4 px-4 ">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <thead className="bg-zinc-200 uppercase font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Featured
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Archived
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-300 divide-y divide-gray-700">
          {filteredProducts?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-400">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{product.name}</div>
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
                <button
                  onClick={() => toggleFeauturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "transparent"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleArchivedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isArchived
                      ? "bg-accent text-gray-900"
                      : "transparent"
                  } hover:bg-accent transition-colors duration-200`}
                >
                  <Archive className="h-5 w-5" />
                </button>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => toggleActionMenu(product._id)}
                  className="hover:bg-zinc-500 py-1 px-2 rounded-md"
                >
                  <Ellipsis className="h-5 w-5" />
                </button>
                {toggleAction === product._id && (
                  <div
                    className="z-10 absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200"
                    onClick={(e) => {
                      setToggleAction(null);
                      e.stopPropagation();
                    }}
                  >
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition"
                      onClick={() => setUpdateProductId(product._id)}
                    >
                      <PenLine className="w-4 h-4 mr-2 text-blue-600" /> Edit
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 transition"
                      onClick={() => setDeleteProductId(product._id)}
                    >
                      <Trash className="w-4 h-4 mr-2 text-red-600" /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </div>

      {deleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setDeleteProductId(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
