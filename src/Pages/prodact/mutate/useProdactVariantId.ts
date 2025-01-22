import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useProdactVariantId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["prodact-variant", id],
    queryFn: () =>
      request.get(`/product_variant/${id}/`).then((res) => res.data),
  });
};
