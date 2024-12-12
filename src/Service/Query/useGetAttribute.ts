import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetAttribute = () => {
  return useQuery({
    queryKey: ["attribute"],
    queryFn: () => request.get("/attribute/").then((res) => res.data),
  });
};
