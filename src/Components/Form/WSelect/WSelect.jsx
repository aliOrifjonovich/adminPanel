import React from "react";
import { Controller } from "react-hook-form";
import SelectMenu, { components } from "react-select";
import styles from "./WSelect.module.scss";
import { Tooltip } from "@mui/material";
import { SelectionArrow } from "helpers/Icons/Icons";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectionArrow stroke={props.isDisabled ? "#9AA6AC" : "#293649"} />
    </components.DropdownIndicator>
  );
};

const WSelect = ({
  placeholder,
  options,
  defaultValue,
  name = "",
  control,
  errors,
  validation,
  isSearchable = false,
  isClearable = false,
  isMulti = false,
  disabled = false,
  placement = "auto",
  noOptionsText = "Нет вариантов",
  onInputChange,
}) => {
  const colourStyles = {
    control: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled ? "#F6F8F9" : "#F6F8F9",
      borderWidth: "1px",
      borderColor: isFocused
        ? "var(--primary-color)"
        : errors?.[`${name}`]?.message
        ? "#f76659"
        : "#F6F8F9",
      boxShadow: "none",
      minHeight: "48px !important",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all .25s ease-in-out",
      ":hover": {
        borderColor: "var(--primary-color)",
      },
      "@media (max-width: 768px)": {
        height: "42px",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        cursor: isDisabled ? "not-allowed" : "default",
        backgroundColor: isFocused ? "rgba(16, 130, 146, 0.1)" : "#fff",
        color: isDisabled ? "#6E7C87" : "#252C32",
        fontSize: "14px",
        lineHeight: "17px",
        ":active": {
          ...styles[":active"],
        },
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: "14px",
      lineHeight: "17px",
      color: "#9AA6AC",
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      fontSize: "14px",
      lineHeight: "17px",
    }),
  };

  const NoOptionsMessage = (props) => {
    return (
      <Tooltip title="Custom NoOptionsMessage Component">
        <components.NoOptionsMessage {...props}>
          {noOptionsText}
        </components.NoOptionsMessage>
      </Tooltip>
    );
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field: { value, onChange } }) => {
          return (
            <SelectMenu
              menuPlacement={`${placement}`}
              classNamePrefix="select"
              options={options}
              placeholder={placeholder}
              defaultValue={defaultValue}
              styles={colourStyles}
              openMenuOnFocus={true}
              isSearchable={isSearchable}
              isMulti={isMulti}
              isDisabled={disabled}
              value={value}
              isClearable={isClearable}
              className="basic-multi-select"
              onChange={onChange}
              onInputChange={onInputChange}
              components={{
                NoOptionsMessage,
                IndicatorSeparator: () => null,
                DropdownIndicator,
                Menu: (props) => (
                  <components.Menu {...props} className={styles.menu} />
                ),
              }}
            />
          );
        }}
      />
      {errors?.[`${name}`]?.message && (
        <span className={styles.errMsg}>{errors?.[`${name}`]?.message}</span>
      )}
    </>
  );
};

export default WSelect;
