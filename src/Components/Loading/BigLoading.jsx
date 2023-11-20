import React from "react";
import styles from "./Loading.module.scss";
import { CircularProgress } from "@mui/material";

const BigLoading = () => {
  return (
    <div className={styles.bigLoading}>
      <CircularProgress sx={{ color: "#00acb5" }} />
    </div>
  );
};

export default BigLoading;
