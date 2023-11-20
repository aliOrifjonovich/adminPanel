import React from "react";
import InputMask from "react-input-mask";
import { Controller } from "react-hook-form";
import styles from "./PhoneInput.module.scss";
import { Collapse } from "@mui/material";

const PhoneInput = ({
  control,
  name = "",
  mask,
  placeholder,
  errors,
  validation,
  maskChar = "",
  alwaysShowMask = false,
  required = false,
  autoFocus = false,
  disabled = false,
  phoneValidation = false,
  ...props
}) => {
  return (
    <div>
      <Controller
        control={control}
        rules={validation}
        name={name}
        render={({ field: { value, onChange, name } }) => {
          return (
            <InputMask
              mask={`${mask}`}
              maskChar={maskChar}
              autoFocus={autoFocus}
              placeholder={placeholder}
              style={
                errors?.[`${name}`]?.message ? { borderColor: "#F76659" } : {}
              }
              className={styles.input}
              required={required}
              value={value}
              disabled={disabled}
              onChange={(e) =>
                onChange(
                  e.target.value
                    .replaceAll(" ", "")
                    .replaceAll("-", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                )
              }
              {...props}
            />
          );
        }}
      />
      <Collapse in={errors?.[`${name}`]?.message} collapsedSize={0}>
        <span className={styles.errMsg}>{errors?.[`${name}`]?.message}</span>
      </Collapse>
    </div>
  );
};

export default PhoneInput;
