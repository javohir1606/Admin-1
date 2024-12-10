import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBrandDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
  });
};
