import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSingleBrandData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-brand-data", id],
    queryFn: () => request.get(`/brand/${id}/`).then((res) => res.data),
  });
};
