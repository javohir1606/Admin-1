import { useMutation } from "@tanstack/react-query";
import { request } from "../config/request";

export const useAtrebutePatch = () => {
  return useMutation({
    mutationFn: ({ data }: any) => {
      return request.patch("/api/category_edit/", data).then((res) => res.data);
    },
  });
};
