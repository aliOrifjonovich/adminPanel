import Input from "Components/Form/Input/Input";
import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import useDebounce from "utils/useDebounce";
import { UseGeocoderAddresses } from "services/yandexMap.service";
import styles from "./YandexMap.module.scss";
import SearchAddressDropDown from "./SearchAddressDropDown";
import SuperYandexMap from "./SuperYandexMap";

const YandexMap = ({ control, name, setValue, errors }) => {
  const watchedAddress = useWatch({ control, name });
  const position = useWatch({ control, name: "position" });
  const [addressesFocus, setAddressesFocus] = useState(false);

  const debouncedSearchAddress = useDebounce(watchedAddress, 700);
  const { data: addresses } = UseGeocoderAddresses({
    queryParams: debouncedSearchAddress,
    querySettings: {
      enabled: !!debouncedSearchAddress,
    },
  });

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Input
          name={name}
          type="text"
          control={control}
          placeholder="Addres"
          onChange={(e) => {
            setValue(name, e.target.value);
            setValue("searchAddress", e.target.value);
            setAddressesFocus(true);
          }}
          validation={{
            required: {
              value: true,
              message: "Обязательное поле",
            },
          }}
          errors={errors}
        />
        {addressesFocus && (
          <SearchAddressDropDown
            setFocus={setAddressesFocus}
            address={addresses?.GeoObjectCollection?.featureMember}
            setValue={setValue}
            name={name}
          />
        )}
        <div className={styles.mapBox}>
          <SuperYandexMap
            zoom={10}
            placemark={position}
            setValue={setValue}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default YandexMap;
