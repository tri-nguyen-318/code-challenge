// src/hooks/usePrices.ts
import type { ICurrency } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dayjs } from "@/lib/dayjs";

const fetchPrices = async (): Promise<ICurrency[]> => {
  // Simulate delay using a Promise
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { data } = await axios.get<ICurrency[]>(
    "https://interview.switcheo.com/prices.json"
  );

  // Sort by date, keeping only the latest entry for each currency
  const latestPrices: Record<string, ICurrency> = {};
  data.forEach((item) => {
    const existing = latestPrices[item.currency];
    if (!existing || dayjs(item.date).isAfter(dayjs(existing.date))) {
      latestPrices[item.currency] = item;
    }
  });

  // Convert the object back to an array
  return Object.values(latestPrices);
};

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    staleTime: 1000 * 60, // 1 minute
  });
}
