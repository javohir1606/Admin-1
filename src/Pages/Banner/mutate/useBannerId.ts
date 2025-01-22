import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useBannerId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data),
  });
};
