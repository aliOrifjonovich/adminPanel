import React, { useState } from "react";
import styles from "./Input.module.scss";
import { Controller } from "react-hook-form";
import { HidePasswordIcon, ShowPasswordIcon } from "helpers/Icons/Icons";
import { Collapse } from "@mui/material";

const Input = ({
  type = "text",
  disabled,
  name = "",
  defaultValue,
  control,
  startIcon,
  endIcon,
  errors,
  validation,
  autoComplete = "off",
  required = false,
  placeholder,
  isMap,
  onChangeMap,
  min,
  typePassword,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div>
      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { value, onChange, name } }) => {
          return (
            <div
              style={
                errors?.[`${name}`]?.message ? { borderColor: "#F76659" } : {}
              }
              className={`${styles.inputWrapper} ${
                disabled && styles.disabled
              }`}
            >
              {startIcon}
              <input
                min={min}
                placeholder={placeholder}
                type={showPassword && typePassword ? "password" : type}
                disabled={disabled}
                value={value
                  ?.toString()
                  ?.replace(/\s{2,}/g, " ")
                  .trimStart()}
                autoComplete={autoComplete}
                onChange={(e) => {
                  onChange(e);
                  if (isMap) {
                    onChangeMap(e);
                  }
                }}
                required={required}
                {...restProps}
              />

              {typePassword ? (
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </div>
              ) : (
                endIcon
              )}
            </div>
          );
        }}
      />
      <Collapse in={errors?.[`${name}`]?.message} collapsedSize={0}>
        <span className={styles.errMsg}>{errors?.[`${name}`]?.message}</span>
      </Collapse>
    </div>
  );
};

export default Input;
