import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./keys";
import { getAllOurCategories } from "@apis/services/ourCategories";

export function useGetAllOurCategories(
  filters: Record<string, string | number>,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: productKeys.filters(filters),
    queryFn: () => getAllOurCategories(filters),
    enabled,
  });
}
