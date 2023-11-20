import React from "react";
import { Outlet } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";
import {
  CreateNewFolder,
  Delete,
  DeleteSweep,
  Refresh,
} from "@mui/icons-material";
import useMain from "./useMain";
import { sideBarExpand } from "redux/sidebar/sidebar.slice";
import { resizeChange } from "redux/resize/resize.slice";

const enableBottomToolbar = true;
const enableTopToolbar = true;

const Main = () => {
  const {
    id,
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
    dispatch,
    pagination,
    handlePaginationChange,
    columnSizing,
  } = useMain();

  return (
    <div id={!enableTopToolbar && !enableBottomToolbar && "mui-table"}>
      {!id && (
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
          defaultColumn={{
            minSize: 40, //allow columns to get smaller than default
            maxSize: 1000, //allow columns to get larger than default
            size: 260, //make columns wider by default
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
            columnSizing: columnSizing.resize?.[tab_name] || {},
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
            <div
              style={{
                padding: "0 20px",
                maxWidth: "100%",
                display: "flex",
                gap: "5px",
              }}
            >
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
              {tab_name !== "order" && (
                <Tooltip arrow title="Create">
                  <IconButton
                    onClick={() => navigate(`/main/${tab_name}/create`)}
                    sx={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <CreateNewFolder />
                  </IconButton>
                </Tooltip>
              )}
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
          )}
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              navigate(`/main/${tab_name}/${row.original.id}`);
              dispatch(sideBarExpand.setOpenSideBarExpandSinglePage());
            },
            sx: {
              cursor: "pointer",
            },
          })}
          columnResizeMode="onEnd"
          onColumnSizingChange={(size) => {
            if (tab_name in columnSizing.resize) {
              dispatch(
                resizeChange.setResize({
                  ...columnSizing.resize,
                  [tab_name]: { ...columnSizing.resize[tab_name], ...size() },
                })
              );
            } else {
              dispatch(
                resizeChange.setResize({
                  ...columnSizing.resize,
                  [tab_name]: size(),
                })
              );
            }
          }}
        />
      )}
      <Outlet />
    </div>
  );
};

export default Main;
