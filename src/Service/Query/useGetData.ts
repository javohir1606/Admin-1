import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetData = () => {
  return useQuery({
    queryKey: ["get-data"],
    queryFn: () => request.get("/category/").then((res) => res.data),
  });
};
