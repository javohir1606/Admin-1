import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { AttributeValuesType } from "../../Types/data-types";

export const useAttributeEdit = () => {
  return useMutation({
    mutationFn: (data: AttributeValuesType | any) =>
      request.patch(`/api/category_edit/`, data).then((res) => res.data),
  });
};
