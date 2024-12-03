import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSubCategory = () => {
  return useQuery({
    queryKey: ["get-sub-category"],
    queryFn: () => request.get("/api/subcategory/").then((res) => res.data),
  });
};
