const ProductCardSkeleton = () => {
  return (
    <div className="space-y-2 rounded-md">
      <div className="rounded-sm border bg-zinc-300 sm:w-56 w-full sm:h-[16rem] h-60 p-2" />
      <div className="bg-zinc-200 h-7 w-[80%]" />
      <div className="bg-zinc-200 h-7 w-[90%]" />
    </div>
  );
};

export default ProductCardSkeleton;
