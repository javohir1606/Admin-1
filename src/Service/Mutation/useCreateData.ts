import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
// import { getDataType } from "../../Types/data-types";

export const useCreateData = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/category/", data).then((res) => res.data),
  });
};
