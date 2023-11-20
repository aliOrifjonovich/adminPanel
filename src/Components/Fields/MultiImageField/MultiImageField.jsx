import React from "react";
import styles from "./MultiImageField.module.scss";

const MultiImageField = ({ images }) => {
  return (
    <div className={styles.images}>
      {images.map((elem) => (
        <img src={elem} alt="images" />
      ))}
    </div>
  );
};

export default MultiImageField;
