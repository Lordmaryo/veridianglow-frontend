export const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

export const formatCurrency = (amount: number | undefined) => {
  return `₦${(amount ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
};
