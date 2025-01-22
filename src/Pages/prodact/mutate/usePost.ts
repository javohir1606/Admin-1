import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const usePost = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/product/", data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
