import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/banner/", data).then((res) => res.data),
  });
};
