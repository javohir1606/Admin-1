import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { useQueryClient } from "@tanstack/react-query";
export const useEditCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) =>
      request.patch(`/category/${id}/`, data).then((res) => res.data),
    onSuccess: (_, id) => {
      client.invalidateQueries({ queryKey: ["get-data"] });
      client.invalidateQueries({ queryKey: ["get-sub-category"] });
      client.invalidateQueries({ queryKey: ["single-data", id] });
    },
  });
};
