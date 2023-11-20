import { useMutation, useQuery } from "react-query";
import { requestUnion } from "./http-client";

const mainService = {
  getMain: (queryParams, tab_name) =>
    requestUnion.get(`/${tab_name}`, {
      params: queryParams,
    }),
  getMainById: (id, tab_name) => requestUnion.get(`/${tab_name}/${id}`),
  postMain: (data, tab_name) => requestUnion.post(`/${tab_name}`, data),
  patchMain: ({ id, tab_name, apiData }) =>
    requestUnion.patch(`/${tab_name}/${id}`, { data: apiData }),
  putMain: ({ id, tab_name, apiData }) =>
    requestUnion.put(`/${tab_name}/${id}`, apiData),
  deleteMain: ({ id, tab_name }) => requestUnion.delete(`/${tab_name}/${id}`),
};

export const UseGetMain = ({ queryParams, tab_name }) => {
  return useQuery(["GET_MAIN", queryParams, tab_name], async () => {
    return await mainService.getMain(queryParams, tab_name).then((res) => res);
  });
};

export const UseGetMainById = ({ id, tab_name, querySettings }) => {
  return useQuery(
    ["GET_MAIN_BY_ID", id, tab_name],
    async () => {
      return await mainService.getMainById(id, tab_name).then((res) => res);
    },
    querySettings
  );
};

export const UsePostMain = (mutationSettings) => {
  return useMutation(
    ({ apiData, tab_name }) => mainService.postMain(apiData, tab_name),
    mutationSettings
  );
};

export const UsePatchMain = (mutationSettings) => {
  return useMutation(
    ({ id, tab_name, apiData }) =>
      mainService?.[tab_name === "user" ? "patchMain" : "putMain"]({
        id,
        tab_name,
        apiData,
      }),
    mutationSettings
  );
};

export const UseDeleteMain = (mutationSettings) => {
  return useMutation(
    ({ id, tab_name }) => mainService.deleteMain({ id, tab_name }),
    mutationSettings
  );
};
