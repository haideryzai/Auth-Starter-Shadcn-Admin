import publicApi from "@apis/instances/public-api";

export function getAllOurCategories(filters?: Record<string, string | number>) {
  // Make the API call with the filters
  return publicApi.get("/our_categories", {
    params: filters,
  });
}

export function updateCategory(categoryId: string, data: any){
  return publicApi.put(`/our_categories/${categoryId}`, data);
};