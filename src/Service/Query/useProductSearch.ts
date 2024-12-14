import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useProductSearch = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: () =>
      request
        .get("/product/", {
          params: { search: input ? input : "00000" },
        })
        .then((res) => res.data),
  });
};
