import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => request.get("/brand/").then((res) => res.data),
  });
};
