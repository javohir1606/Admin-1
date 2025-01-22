import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useProdactVariantGet = () => {
  return useQuery({
    queryKey: ["prodact-variant"],
    queryFn: () => request.get("/product_variant/").then((res) => res.data),
  });
};
