import { useMutation } from "@tanstack/react-query";

import { request } from "../../Config/request";

export const useDeleteData = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
  });
};
