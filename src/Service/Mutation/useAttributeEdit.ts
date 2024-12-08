import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useAttributeEdit = () => {
  return useMutation({
    mutationFn: (data: number | string | any) =>
      request.patch(`/api/category_edit/`, data).then((res) => res.data),
  });
};
