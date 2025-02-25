export const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

export const formatCurrency = (amount: number | undefined) => {
  return `₦${(amount ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
};

export function currencyAbbreviation(amount: number): string {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}k`;
  } else {
    return `₦${amount.toFixed(2)}`;
  }
}


export const truncateWord = (word: string | null, maxLength: number) => {
  if (!word) return word;

  const numOfWords = word.length;
  return numOfWords > maxLength ? word.slice(0, maxLength) + "..." : word;
};

export const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
