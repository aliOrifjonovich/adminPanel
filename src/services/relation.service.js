import { useQuery } from "react-query";
import { requestUnion } from "./http-client";

const relationService = {
  getRelations: (queryParams, tab_name) =>
    requestUnion.get(`/${tab_name}`, {
      params: queryParams,
    }),
};

export const UseGetRelations = ({ queryParams, tab_name }) => {
  return useQuery(["GET_RELATIONS", queryParams, tab_name], async () => {
    return await relationService
      .getRelations(queryParams, tab_name)
      .then((res) => res);
  });
};
