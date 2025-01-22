import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useGetId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => request.get(`/brand/${id}`).then((res) => res.data),
  });
};
