import React from "react";
import { Controller } from "react-hook-form";

const SingleFileUpload = ({
  control,
  validation,
  defaultValue,
  name,
  handleImage,
  uploadRef,
  unvisible,
}) => {
  return (
    <Controller
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { value, onChange, name } }) => {
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImage(e);
            }}
            ref={uploadRef}
            style={{ display: unvisible && "none" }}
          />
        );
      }}
    />
  );
};

export default SingleFileUpload;
