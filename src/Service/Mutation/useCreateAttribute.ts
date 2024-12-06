import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { AttrValue } from "../../Types/data-types";

export const 
useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: AttrValue | any) =>
      request.post("/attribute/", data).then((res) => res.data),
  });
};
