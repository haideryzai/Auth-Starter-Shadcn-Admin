const rawData = {
    brands: [],
    platforms: [{ _id: "2024-12-09", count: 57 }],
    categories: [
      { _id: "2024-12-09", count: 1098 },
      { _id: "2024-12-12", count: 166 },
    ],
    products: [{ _id: "2024-12-09", count: 5023 }],
  };
  
export const convertToChartData = (data: typeof rawData) => {
    // Get all unique dates from the data
    const datesSet = new Set<string>();
    ["brands", "platforms", "categories", "products"].forEach((key) => {
      data[key as keyof typeof rawData].forEach((item: { _id: string }) =>
        datesSet.add(item._id)
      );
    });
  
    // Create a sorted array of all dates
    const dates = Array.from(datesSet).sort();
  
    // Generate chart data for all dates
    const chartData = dates.map((date) => {
      const brands = data.brands.find((item) => item._id === date)?.count || 0;
      const platforms =
        data.platforms.find((item) => item._id === date)?.count || 0;
      const categories =
        data.categories.find((item) => item._id === date)?.count || 0;
      const products = data.products.find((item) => item._id === date)?.count || 0;
  
      return { date, brands, platforms, categories, products };
    });
  
    return chartData;
  };
  