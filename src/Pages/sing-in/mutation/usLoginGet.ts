import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { Userdata } from "./type";
import Cookies from "js-cookie";

interface Tokendata {
  token: string;
}
export const usLoginGet = () => {
  return useMutation({
    mutationFn: (data: Userdata) =>
      request
        .post<Tokendata>("/api/admin-login/", data)
        .then((res) => res.data),
    onSuccess: (res) => {
      Cookies.set("accessToken", res.token);
    },
    
  });
};
