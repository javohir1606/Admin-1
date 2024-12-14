import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useSearchProductVariant = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: () =>
      request
        .get("/product_variant/", {
          params: { search: input ? input : "00000" },
        })
        .then((res) => res.data),
  });
};
