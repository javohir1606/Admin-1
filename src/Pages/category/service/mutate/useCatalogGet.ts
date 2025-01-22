import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CategoryType {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    children: [];
    id: number;
    image: string;
    title: string;
  }[];
}

export const useCatalogGet = () => {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: () =>  request.get<CategoryType>("/category/").then((res) => res.data),
    
  });
};
