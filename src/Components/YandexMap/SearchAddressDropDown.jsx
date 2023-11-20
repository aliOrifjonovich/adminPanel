import React from "react";
import { PlaceMarkIcon } from "helpers/Icons/Icons";
import cls from "./YandexMap.module.scss";

const SearchAddressDropDown = ({ setFocus, address, setValue, name }) => {
  const handleClickItem = (city) => {
    const locationPos = city.Point.pos;
    setFocus(false);
    setValue(name, `${city.name} ${city.description}`);
    setValue(
      "position",
      locationPos
        ? [Number(locationPos.split(" ")[1]), Number(locationPos.split(" ")[0])]
        : [city.location.lat, city.location.long]
    );
  };

  return (
    <div className={cls.main}>
      {address?.map((item, index) => (
        <div
          className={cls.item}
          onClick={() => handleClickItem(item.GeoObject)}
          key={index}
        >
          <PlaceMarkIcon />
          <div className={cls.itemInfo}>
            <h4>{item.GeoObject.name}</h4>
            <p>{item.GeoObject.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchAddressDropDown;
