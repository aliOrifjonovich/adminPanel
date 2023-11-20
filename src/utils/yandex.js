import axios from "axios";
import { apikey } from "./mapDefaults";

export const getGeoCodeAddressList = (geocoder, params, count = 0) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "https://geocode-maps.yandex.ru/1.x/",
      params: {
        format: "json",
        apikey: apikey,
        geocode: geocoder,
        sco: "latlong",
        lang: "ru-RU",
        results: 5,
        ll: "69.241320,41.292906", // new state
        spn: "6.5,6.5",
        rspn: 1,
      },
    })
      .then((res) => resolve(res))
      .catch((err) => {});
  });
};
