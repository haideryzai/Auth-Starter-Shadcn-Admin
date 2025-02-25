import publicApi from "@apis/instances/public-api";

export function getAllPlatforms(filters?: Record<string, string | number>) {
  // Parse the query string into an object
  console.log('window.location.search', window.location.search)
  const queryParams = new URLSearchParams(window.location.search);
  const queryFilters: Record<string, string | number> = {};
  queryParams.forEach((value, key) => {
    queryFilters[key] = value
  });


  // Merge provided filters with query string filters
  filters = {
    ...queryFilters,
    ...filters, // Override query string values with provided filters
  };

  // Remove any filters with empty or undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key] === "" || filters[key] === null || filters[key] === undefined) {
      delete filters[key];
    }
  });

  // Update the URL with the latest filters
  const params = new URLSearchParams(filters as Record<string, string>);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);

  console.log("FILTERS After", filters);

  // Make the API call with the filters
  return publicApi.get("/platforms", {
    params: filters,
  });
}
