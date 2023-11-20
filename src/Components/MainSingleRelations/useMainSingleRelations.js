import { useEffect, useMemo, useState } from "react";
import styles from "./MainSingleRelations.module.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UseDeleteMain, UseGetMain } from "services/main.service";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/alert/alert.thunk";
import { queryClient } from "services/http-client";
import { paginationChange } from "redux/pagination/pagination.slice";
import { columns } from "Components/Columns/Columns";

const useMainSingleRelations = () => {
  const dispatch = useDispatch();
  const expandedSinglePage = useSelector(
    (state) => state.sidebar.expandSinglePage
  );
  const { id, tab_name } = useParams();
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [searchParams] = useSearchParams();

  const tabs = useMemo(() => {
    switch (tab_name) {
      case "order":
        return [
          {
            index: 0,
            label: "Main",
            value: tab_name,
          },
          {
            index: 1,
            label: "Order items",
            value: "order_item",
          },
        ];

      default:
        return [];
    }
  }, [tab_name]);

  const pagination = useSelector(
    (state) => state.pagination.pagination_relation
  );
  const columnSizing = useSelector((state) => state.resize);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setColumnPinning({
        left: ["#", "mrt-row-expand", "mrt-row-numbers", "mrt-row-select"],
        right: ["mrt-row-actions"],
      });
    }
  }, []);

  const { data, isError, isFetching, isLoading, refetch } = UseGetMain({
    queryParams: {
      offset: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize,
      [`${tab_name}_id`]: searchParams.get("relation") && id,
    },
    tab_name: searchParams.get("relation") || tab_name,
  });

  const { mutateAsync: mainDeleteMutate } = UseDeleteMain({
    onSuccess: (res) => {
      dispatch(showAlert("Successfully deleted", "success"));
      queryClient.refetchQueries("GET_MAIN");
    },
    onError: (err) => {},
  });

  const handleDeleteRow = (row) => {
    mainDeleteMutate({ id: row.original.id, tab_name }).then((res) => {
      if (row.original.id === id && data?.users?.[0]?.id) {
        navigate(`/main/${tab_name}/${data?.users?.[0]?.id}`);
      } else {
        navigate(`/main/${tab_name}`);
      }
    });
  };

  const handlePaginationChange = (item) => {
    dispatch(paginationChange.setPaginationRelation(item(pagination)));
  };
  return {
    id,
    tab_name,
    navigate,
    data,
    columns: [
      {
        accessorFn: (_, index) => (
          <div className={styles.order}>
            {pagination.pageIndex * pagination.pageSize + index + 1}
          </div>
        ),
        header: "#",
        size: 45,
        minSize: 45,
        enableColumnActions: false,
        enableEditing: false,
        enableExpanding: false,
        enableColumnDragging: false,
        enableColumnFilter: false,
        enableColumnOrdering: false,
        enableResizing: false,
        enableSorting: false,
      },
      ...columns(searchParams.get("relation") || tab_name),
    ],
    setColumnFilters,
    setGlobalFilter,
    setSorting,
    columnFilters,
    globalFilter,
    isLoading,
    pagination,
    isError,
    isFetching,
    sorting,
    columnPinning,
    setColumnPinning,
    refetch,
    handleDeleteRow,
    handlePaginationChange,
    dispatch,
    expandedSinglePage,
    columnSizing,
    tabs,
  };
};

export default useMainSingleRelations;
