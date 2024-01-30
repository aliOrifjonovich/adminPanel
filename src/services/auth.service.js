import { useMutation } from "react-query";
import { requestUnionAuth } from "./http-client";

const authService = {
  login: (data) => requestUnionAuth.post("/auth/login", data),
};

export const UseAuth = (mutationSettings) => {
  return useMutation((data) => authService.login(data), mutationSettings);
};
