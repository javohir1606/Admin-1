import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => request.get("/product/").then((res) => res.data),
  });
};
