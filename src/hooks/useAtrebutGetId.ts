import { useQuery } from "@tanstack/react-query";
import { request } from "../config/request";

export const useAtrebutGetId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["attribute", id],
    queryFn: () => request.get(`/attribute/${id}/`).then((res) => res.data),
  });
};
