import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";


export const useSearchCategoryQuery = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: () =>
      request
        .get("/category/", {
          params: { search: input ? input : "00000" },
        })
        .then((res) => res.data),
  });
};
