import { useMutation } from "@tanstack/react-query";
import { request } from "../config/request";
export interface Atrebut {
  attr_list: {
    category: number[];
    title: string;
    values: string[];
  }[];
}
export const useAtrebutPost = () => {
  return useMutation({
    mutationFn: (data: Atrebut) =>
      request.post("/attribute/", data).then((res) => res.data),
  });
};
