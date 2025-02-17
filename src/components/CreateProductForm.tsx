import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";
import { productCategories, subCategory } from "../data/product";
import { Loader, PlusCircle, Upload } from "lucide-react";
import AddIngredients from "./AddIngredients";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0.0,
    discountPrice: 0.0,
    stock: 0,
    isOutOfStock: false,
    howToUse: "",
    image: "",
    category: "",
    subCategory: "",
    brand: "",
    ingredients: [""],
    isFeatured: false,
    isArchived: true,
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data", formData);
    try {
      await createProduct(formData);
      setFormData({
        name: "",
        description: "",
        price: 0.0,
        discountPrice: 0.0,
        stock: 0,
        isOutOfStock: false,
        howToUse: "",
        image: "",
        category: "",
        subCategory: "",
        brand: "",
        ingredients: [""],
        isFeatured: false,
        isArchived: true,
      });
    } catch (error: any) {
      toast.error("Error upoading product");
      console.error("Error creating products", error.response.data.error);
    }
  };

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (e: ImageChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, image: reader.result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[600px] h-screen w-full mt-10 mb-4 px-4">
      <h2 className="text-2xl font-bold capitalize">Create a new product</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              type="text"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Cerave..."
              className="bg-zinc-200 w-full outline-none py-2 px-4 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="brand-name">Brand name</label>
            <input
              id="brand-name"
              type="text"
              value={formData.brand}
              required
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              placeholder="Nivea..."
              className="bg-zinc-200 w-full outline-none py-2 px-4 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Product description here"
            className="bg-zinc-200 h-28 w-full outline-none py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              placeholder="₦0.0"
              className="bg-zinc-200 w-full outline-none py-2 px-4 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="discount-price">Discount Price</label>
            <input
              id="discount-price"
              type="number"
              value={formData.discountPrice}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discountPrice: parseFloat(e.target.value),
                })
              }
              placeholder="₦0.0"
              className="bg-zinc-200 w-full outline-none py-2 px-4 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            value={formData.stock}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: parseFloat(e.target.value),
              })
            }
            placeholder="₦0.0"
            className="bg-zinc-200 w-full outline-none py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="mt-1 block w-full border border-gray-600 rounded-md
      shadow-sm py-2 px-3 focus:outline-none cursor-pointer
      focus:ring-2 focus:ring-black"
            >
              <option value="">Select a category</option>
              {productCategories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="sub-category">Suitable for?</label>
            <select
              id="sub-category"
              value={formData.subCategory.toUpperCase()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subCategory: e.target.value.toUpperCase(),
                })
              }
              required
              className="mt-1 block w-full border border-gray-600 rounded-md
      shadow-sm py-2 px-3 focus:outline-none cursor-pointer
      focus:ring-2 focus:ring-black"
            >
              <option value="">Select a sub category</option>
              {subCategory.map((category) => (
                <option value={category.toUpperCase()} key={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="how-to-use">How to use</label>
          <textarea
            id="how-to-use"
            value={formData.howToUse}
            required
            onChange={(e) =>
              setFormData({ ...formData, howToUse: e.target.value })
            }
            placeholder="How to use product..."
            className="bg-zinc-200 h-28 w-full outline-none py-2 px-4 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <input
            id="image"
            type="file"
            required
            onChange={handleImageChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="cursor-pointer py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium"
          >
            <Upload className="inline-block mr-2 h-5 w-5" />
            Upload Image
          </label>
          {formData.image && (
            <span className="ml-3 text-sm text-zinc-500">Image uploaded</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="featured">Featured Product</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="draft"
              type="checkbox"
              checked={formData.isArchived}
              onChange={(e) =>
                setFormData({ ...formData, isArchived: e.target.checked })
              }
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="draft">Draft</label>
          </div>
        </div>
        <div className="py-4">
          <AddIngredients
            ingredients={formData.ingredients}
            setIngredients={(updatedIngredients) =>
              setFormData({ ...formData, ingredients: updatedIngredients })
            }
          />
        </div>
        <button
          disabled={loading}
          className="disabled:opacity-75 cursor-pointer bg-accent text-white w-full py-2 rounded-md hover:opacity-85 transition-opacity"
        >
          {loading ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <Loader size={20} className="animate-spin" aria-hidden={true} />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <PlusCircle size={20} />
              <span>Create product</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
