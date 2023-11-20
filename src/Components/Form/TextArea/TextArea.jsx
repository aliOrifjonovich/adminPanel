import React from "react";
import styles from "./TextArea.module.scss";
import { Controller } from "react-hook-form";

const Textarea = ({
  disabled,
  name = "",
  defaultValue,
  control,
  icon,
  autoComplete = "off",
  placeholder,
  errors,
  validation,
  required = false,
  commentsRef,
  noBorder = false,
  ...restProps
}) => {
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
              className={`${styles.textAreaWrapper} ${
                disabled ? styles.disabled : ""
              } ${noBorder ? styles.noBorder : ""}`}
            >
              {icon && icon}
              <textarea
                style={
                  errors?.[`${name}`]?.message
                    ? { borderColor: "#F76659", fontFamily: "inherit" }
                    : { fontFamily: "inherit" }
                }
                rows={10}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                autoComplete={autoComplete}
                onChange={onChange}
                required={required}
                ref={commentsRef}
                {...restProps}
              />
            </div>
          );
        }}
      />
      {errors?.[`${name}`]?.message && (
        <span className={styles.errMsg}>{errors?.[`${name}`]?.message}</span>
      )}
    </div>
  );
};

export default Textarea;
