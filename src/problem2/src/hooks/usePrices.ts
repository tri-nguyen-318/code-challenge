// src/hooks/usePrices.ts
import type { ICurrency } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dayjs } from "@/lib/dayjs";
import { _ } from "@/lib/lodash";

const fetchPrices = async (): Promise<ICurrency[]> => {
  const { data } = await axios.get<ICurrency[]>(
    "https://interview.switcheo.com/prices.json"
  );

  // Sort by date then only get the newest price for each currency

  const latestPrices: Record<string, ICurrency> = {};
  data.forEach((item) => {
    const existing = latestPrices[item.currency];
    if (!existing || dayjs(item.date).isAfter(dayjs(existing.date))) {
      latestPrices[item.currency] = item;
    }
  });

  // Convert the object back to an array
  return _.values(latestPrices);
};

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    staleTime: 1000 * 60, // 1 minute
  });
}
