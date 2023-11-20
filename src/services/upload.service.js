import { useMutation } from "react-query";
import { requestUnion } from "./http-client";

const uploadService = {
  upload: (data) => requestUnion.post(`/upload`, data),
};

export const UseUpload = (mutationSettings) => {
  return useMutation((data) => uploadService.upload(data), mutationSettings);
};
