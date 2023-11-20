import React, { useRef } from "react";
import styles from "./UploadImages.module.scss";

import { CircularProgress } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { PlusIcon, RemoveIcon } from "helpers/Icons/Icons";
import { UseUpload } from "services/upload.service";

const UploadImages = ({
  control,
  name,
  rules,
  required,
  disabledHelperText = false,
  setValue,
  ...props
}) => {
  const inputRef = useRef();

  const photos = useWatch({
    control,
    name,
  });

  const handleDelete = (url) => {
    setValue(
      name,
      photos?.filter((item) => item !== url)
    );
  };

  const { mutateAsync, isLoading } = UseUpload({
    onSuccess: () => {},
  });

  return (
    <div className={styles.root}>
      <div className={styles.rowImages}>
        {photos?.length !== 20 && (
          <div
            className={styles.inputWrapper}
            onClick={() => inputRef.current.click()}
          >
            <Controller
              control={control}
              name={name}
              defaultValue=""
              rules={{
                required: required ? "Это обязательное поле" : false,
                ...rules,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={inputRef}
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      const data = new FormData();
                      data.append("file", file);
                      mutateAsync(data)
                        .then((res) => {
                          photos
                            ? onChange([...photos, res?.filename])
                            : onChange([res?.filename]);
                        })
                        .catch((err) => {
                          console.log("err", err);
                        });
                    }}
                    className={styles.uploadImageInput}
                    {...props}
                  />
                  <label>
                    <PlusIcon
                      stroke={
                        !disabledHelperText && error?.message
                          ? "red"
                          : "#6E8BB7"
                      }
                      width={!disabledHelperText && error?.message && "36"}
                      height={!disabledHelperText && error?.message && "36"}
                    />
                  </label>
                </>
              )}
            />
          </div>
        )}
        {photos?.length > 0 &&
          photos?.map((el, index) => (
            <div className={styles.showImage} key={`real-estate-${index}`}>
              <span onClick={() => handleDelete(el)}>
                <RemoveIcon />
              </span>
              {isLoading ? (
                <CircularProgress
                  variant="indeterminate"
                  sx={{
                    position: "absolute !important",
                    top: "50% !important",
                    left: "50% !important",
                    transform: "translate(-50%, -50%) !important",
                  }}
                />
              ) : (
                <img className={styles.imgWrapper} src={el} alt="photos" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImages;
