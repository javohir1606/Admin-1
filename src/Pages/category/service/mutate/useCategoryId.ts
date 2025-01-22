import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
// interface CategoryType {
//   id?: string | undefined;
//   image?: string;
//   title?: string;
//   children?: [];
// }
export const useCategoryId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["catalog", id],
    queryFn: () => request.get(`/category/${id}/`).then((res) => res.data),
  });
};
