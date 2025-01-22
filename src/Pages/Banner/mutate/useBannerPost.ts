import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useBannerPost = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/banner/", data).then((res) => res.data);
    },
  });
};
