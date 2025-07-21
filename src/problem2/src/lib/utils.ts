import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateToAmount({
  fromAmount,
  fromCurrency,
  toCurrency,
}: {
  fromAmount: string;
  fromCurrency: number;
  toCurrency: number;
}): string {
  const toAmount = (Number(fromAmount) * toCurrency) / fromCurrency;
  return toAmount.toFixed(2);
}
