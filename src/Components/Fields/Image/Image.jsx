import React from "react";
import styles from "./Image.module.scss";

const Image = ({ url }) => (
  <img src={url} alt="fieldImage" className={styles.image} />
);

export default Image;
