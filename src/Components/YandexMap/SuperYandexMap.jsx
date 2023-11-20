import React, { useRef } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { apikey } from "utils/mapDefaults";

const SuperYandexMap = ({
  placemark,
  zoom = 13,
  setValue,
  width = "100%",
  height = "100%",
  name,
}) => {
  const yandexMapRef = useRef(null);

  const getAddress = (ymap, e) => {
    ymap.api.geocode(e.get("coords")).then(function (res) {
      var firstGeoObject = res?.geoObjects.get(0);
      setValue(name, firstGeoObject.getAddressLine());
    });
  };
  const onMapClick = (e) => {
    const coords = e.get("coords");
    getAddress(yandexMapRef.current.ymaps, e);
    setValue("position", coords);
  };

  return (
    <YMaps
      ref={yandexMapRef}
      query={{
        apikey,
        lang: "ru_RU",
      }}
    >
      <Map
        width={width}
        height={height}
        onClick={onMapClick}
        modules={["Placemark", "geocode"]}
        state={{
          center: placemark?.length ? placemark : [41.316347, 69.248024],
          zoom: zoom,
        }}
      >
        <Placemark geometry={placemark} />
      </Map>
    </YMaps>
  );
};

export default SuperYandexMap;
