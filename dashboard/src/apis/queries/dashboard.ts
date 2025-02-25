import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "@apis/services/dashboard";
import publicApi from "@apis/instances/public-api";

export function useGetAdminStats() {
  return useQuery({
    queryKey: ["admin_stats"],
    queryFn: () => getAdminStats(),
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}


export async function getAdminStatsTimeline() {
  const response = await publicApi.get("/stats/chart");
  return response.data;
}
