import React from "react";
import styles from "./MainSingleBase.module.scss";
import SideNav from "@trendmicro/react-sidenav";
import MainButton from "Components/MainButton/MainButton";
import useMainSingleBase from "./useMainSingleBase";
import BigLoading from "Components/Loading/BigLoading";
import RelationsSingle from "Components/RelationsSingle/RelationsSingle";

const MainSingleBase = () => {
  const {
    expanded,
    expandedSinglePage,
    tab_name,
    handleSubmit,
    onSubmit,
    control,
    errors,
    id,
    inputs,
    navigate,
    handleDeleteSingle,
    relations,
    isLoading,
  } = useMainSingleBase();

  return (
    <SideNav
      className={styles.base}
      style={{
        marginLeft: expanded ? "240px" : "64px",
        display: expandedSinglePage ? "flex" : "none",
      }}
      expanded={expandedSinglePage}
    >
      <div className={styles.base__body}>
        <div
          className={styles.base__body__header}
          onClick={() => navigate(`/main/${tab_name}`)}
        >
          <h3>{tab_name}</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.base__body__content}
        >
          <div className={styles.base__body__content__inputs}>
            {isLoading ? (
              <BigLoading />
            ) : (
              <>
                {relations.map((elem) => (
                  <RelationsSingle
                    elem={elem}
                    control={control}
                    errors={errors}
                  />
                ))}
                {inputs()}
              </>
            )}
          </div>

          <div className={styles.base__body__content__buttons}>
            <MainButton
              type="button"
              text="Delete"
              fullWidth
              variant="outlined"
              loading={false}
              onClick={() => handleDeleteSingle()}
              sx={{ borderRadius: "0" }}
            />
            <MainButton
              type="submit"
              text={id === "create" ? "Create" : "Edit"}
              fullWidth
              variant="contained"
              loading={false}
              sx={{ borderRadius: "0" }}
            />
          </div>
        </form>
      </div>
    </SideNav>
  );
};

export default MainSingleBase;
