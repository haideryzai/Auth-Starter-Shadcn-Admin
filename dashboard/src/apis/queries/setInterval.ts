import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@apis/services/ourCategories";

export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: any }) =>
      updateCategory(categoryId, data),
  });
}
