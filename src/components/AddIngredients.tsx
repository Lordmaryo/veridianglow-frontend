interface AddIngredientsProps {
  ingredients: string[];
  setIngredients: (updatedIngredients: string[]) => void;
}

const AddIngredients = ({
  ingredients,
  setIngredients,
}: AddIngredientsProps) => {
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const isAddDisabled = ingredients.some(
    (ingredient) => ingredient.trim() === ""
  );

  return (
    <div className="space-y-2">
      <label className="mb-2" htmlFor="ingredients">
        Ingredients
      </label>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            id="ingredients"
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder="Enter ingredient"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={() => removeIngredient(index)}
            type="button"
            className="bg-red-500 text-white p-2 rounded"
            disabled={ingredients.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addIngredient}
        className="font-bold border border-zinc-300 py-2 px-4 rounded disabled:opacity-45"
        disabled={isAddDisabled}
      >
        Add
      </button>
    </div>
  );
};

export default AddIngredients;
