import publicApi from "@apis/instances/public-api";

export function getAdminStats() {

  return publicApi.get("/stats/adminStats");
}