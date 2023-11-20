import React from "react";
import styles from "./MainSingle.module.scss";
import MainSingleRelations from "Components/MainSingleRelations/MainSingleRelations";
import MainSingleBase from "Components/MainSingleBase/MainSingleBase";
import { useSelector } from "react-redux";

const MainSingle = () => {
  const expandedSinglePage = useSelector(
    (state) => state.sidebar.expandSinglePage
  );
  return (
    <div className={styles.mainSingle}>
      <div className={styles.mainSingle__base}>
        <MainSingleBase />
      </div>
      <div
        className="main_single"
        style={{
          marginLeft: `${!expandedSinglePage ? "0px" : "300px"}`,
          width: expandedSinglePage ? "calc(100% - 300px)" : "100%",
        }}
      >
        <MainSingleRelations />
      </div>
    </div>
  );
};

export default MainSingle;
