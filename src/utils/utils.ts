export const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

export const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
};
