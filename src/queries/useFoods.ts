import { useQuery } from "@tanstack/react-query";
import { Food } from "../food";

export function useFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/foods");
      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }
      return response.json() as Promise<Food[]>;
    },
  });
}
