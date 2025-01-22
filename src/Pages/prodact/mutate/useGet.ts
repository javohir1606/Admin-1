import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useGet = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => request.get("/product/").then((res) => res.data),
  });
};
