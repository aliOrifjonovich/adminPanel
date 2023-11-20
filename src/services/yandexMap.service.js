import { useQuery } from "react-query";
import { getGeoCodeAddressList } from "utils/yandex";

const yandexMapService = {
  getGeocoder: (queryParams) => getGeoCodeAddressList(queryParams),
};

export const UseGeocoderAddresses = ({ queryParams, querySettings }) => {
  return useQuery(
    ["GET_GEOCODER_ADDRESSES", queryParams],
    async () => {
      return await yandexMapService
        .getGeocoder(queryParams)
        .then((res) => res.data?.response);
    },
    { ...querySettings }
  );
};
