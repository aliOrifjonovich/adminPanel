import Label from "Components/Label/Label";
import React, { useRef, useState } from "react";
import styles from "./UploadImage.module.scss";
import SingleFileUpload from "./SingleFileUpload";
import Compressor from "compressorjs";
import { UseUpload } from "services/upload.service";
import { CircularProgress } from "@mui/material";
import { ClearImgIcon, ImageAddIcon } from "helpers/Icons/Icons";
import { useWatch } from "react-hook-form";

const UploadImage = ({ control, errors, name, setValue }) => {
  const imageUrl = useWatch({ control, name });

  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { mutate } = UseUpload({
    onSuccess: (res) => {
      setLoading(false);
      setValue(name, res.filename);
    },
  });

  const handleImage = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file?.size <= 10000000) {
      new Compressor(file, {
        quality: 1,
        success(result) {
          const data = new FormData();
          data.append("file", result);
          mutate(data);
        },
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadWithLabel}>
      <Label label="Image">
        <>
          <SingleFileUpload
            control={control}
            name={name || "image_url"}
            type="file"
            handleImage={handleImage}
            uploadRef={uploadRef}
            unvisible
            validation={{
              required: {
                value: true,
                message: "Обязательное поле",
              },
            }}
          />
        </>
      </Label>
      {imageUrl ? (
        <div className={styles.wrap__upload}>
          <img
            src={imageUrl}
            className={styles.uploaded__img}
            alt="uploaded img"
          />
          <div
            className={styles.deleteIcon}
            onClick={() => {
              setValue(name, "");
            }}
          >
            <ClearImgIcon />
          </div>
        </div>
      ) : (
        <div
          onClick={() => uploadRef.current.click()}
          className={styles.upload}
        >
          {loading ? (
            <div className={styles.progress}>
              <CircularProgress variant="indeterminate" />
            </div>
          ) : (
            <ImageAddIcon />
          )}
        </div>
      )}
      {errors?.[`image`]?.message && (
        <span className={styles.errMsg}>{errors?.[`image`]?.message}</span>
      )}
    </div>
  );
};

export default UploadImage;
