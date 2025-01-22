import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const useSubCategoryDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/api/subcategory/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["sub-category"] });
    },
  });
};
