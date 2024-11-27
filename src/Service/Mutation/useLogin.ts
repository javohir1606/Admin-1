import { useMutation } from "@tanstack/react-query";
import { request } from "./../../Config/request";
import { useLoginType } from "./useLoginType";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: useLoginType) =>
      request.post("/api/admin-login/", data).then((res) => res.data),
  });
};
