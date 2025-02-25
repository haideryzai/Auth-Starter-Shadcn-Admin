import { getAllPlatforms } from "@apis/services/platforms";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./keys";

export function useGetAllPlatforms(
  filters: Record<string, string | number>,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: productKeys.filters(filters),
    queryFn: () => getAllPlatforms(filters),
    enabled,
  });
}
