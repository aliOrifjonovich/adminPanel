import React from "react";
import { sideBarExpand } from "redux/sidebar/sidebar.slice";
import useMainSingleRelations from "./useMainSingleRelations";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  CreateNewFolder,
  Delete,
  DeleteSweep,
  Refresh,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { resizeChange } from "redux/resize/resize.slice";
import styles from "./MainSingleRelations.module.scss";
import SuperTabs from "Components/SuperTabs/SuperTabs";

const enableBottomToolbar = true;
const enableTopToolbar = true;

const MainSingleRelations = () => {
  const {
    tab_name,
    navigate,
    data,
    columns,
    setColumnFilters,
    setSorting,
    isLoading,
    isError,
    isFetching,
    columnPinning,
    setColumnPinning,
    refetch,
    handleDeleteRow,
    pagination,
    dispatch,
    expandedSinglePage,
    handlePaginationChange,
    columnSizing,
    tabs,
  } = useMainSingleRelations();

  return (
    <div id={!enableTopToolbar && !enableBottomToolbar && "mui-table"}>
      <MaterialReactTable
        data={data?.datas ?? []}
        columns={columns}
        rowCount={data?.count}
        enableBottomToolbar={enableBottomToolbar}
        enableTopToolbar={enableTopToolbar}
        enableColumnActions={true}
        enableColumnFilters={true}
        enablePagination={true}
        enableSorting={true}
        enableColumnResizing={true}
        enableColumnOrdering={true}
        enablePinning={true}
        enableStickyHeader={true}
        enableStickyFooter={true}
        enableRowSelection={true}
        enableRowActions={true}
        enableColumnDragging={true}
        muiTableProps={{
          sx: {
            border: "1px solid #e1e5e8",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            border: "1px solid #e1e5e8",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            border: "1px solid #e1e5e8",
            whiteSpace: "break-spaces",
          },
        }}
        displayColumnDefOptions={{
          "mrt-row-numbers": {
            size: 10,
          },
          "mrt-row-actions": { size: 80 },
          "mrt-row-select": { size: 55 },
        }}
        manualPagination
        manualSorting
        onColumnFiltersChange={setColumnFilters}
        onColumnPinningChange={setColumnPinning}
        onSortingChange={setSorting}
        onPaginationChange={handlePaginationChange}
        state={{
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          columnPinning,
          pagination,
          columnSizing: columnSizing.resize?.[`${tab_name}_byId`] || {},
        }}
        defaultColumn={{
          minSize: 40, //allow columns to get smaller than default
          maxSize: 9001, //allow columns to get larger than default
          size: 260, //make columns wider by default
        }}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: "flex",
              gap: "0rem",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRow(row);
              }}
              sx={{ padding: 0, margin: 0 }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <div className={styles.topbar}>
            <div>
              <Tooltip arrow title="Refresh">
                <IconButton
                  onClick={() =>
                    dispatch(sideBarExpand.setSideBarExpandSinglePage())
                  }
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {expandedSinglePage ? <ArrowBack /> : <ArrowForward />}
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Refresh">
                <IconButton
                  onClick={() => refetch()}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Create">
                <IconButton
                  onClick={() => refetch()}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <CreateNewFolder />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Delete selected">
                <IconButton
                  onClick={() => refetch()}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <DeleteSweep />
                </IconButton>
              </Tooltip>
            </div>
            {!!tabs.length && <SuperTabs tabs={tabs} />}
          </div>
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            navigate(`/main/${tab_name}/${row.original.id}`);
          },
          sx: {
            cursor: "pointer",
          },
        })}
        columnResizeMode="onEnd"
        onColumnSizingChange={(size) => {
          if (`${tab_name}_byId` in columnSizing.resize) {
            dispatch(
              resizeChange.setResize({
                ...columnSizing.resize,
                [`${tab_name}_byId`]: {
                  ...columnSizing.resize[`${tab_name}_byId`],
                  ...size(),
                },
              })
            );
          } else {
            dispatch(
              resizeChange.setResize({
                ...columnSizing.resize,
                [`${tab_name}_byId`]: size(),
              })
            );
          }
        }}
      />
    </div>
  );
};

export default MainSingleRelations;
