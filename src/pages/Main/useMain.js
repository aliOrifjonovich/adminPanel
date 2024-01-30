import { useState } from "react";
import styles from "./Main.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginationChange } from "redux/pagination/pagination.slice";
import { columns } from "Components/Columns/Columns";

const useMain = () => {
  const { id, tab_name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});

  const pagination = useSelector((state) => state.pagination.pagination_main);
  const columnSizing = useSelector((state) => state.resize);

  const handleDeleteRow = (row) => {};

  const handlePaginationChange = (item) => {
    dispatch(paginationChange.setPaginationMain(item(pagination)));
  };

  return {
    id,
    tab_name,
    navigate,
    data: [],
    columns: [
      {
        accessorFn: (_, index) => (
          <div className={styles.order}>
            {pagination.pageIndex * pagination.pageSize + index + 1}
          </div>
        ),
        header: "#",
        minSize: 45,
        maxSize: 45,
        size: 45,
        enableColumnActions: false,
        enableEditing: false,
        enableExpanding: false,
        enableColumnDragging: false,
        enableColumnFilter: false,
        enableColumnOrdering: false,
        enableResizing: false,
        enableSorting: false,
      },
      ...columns(tab_name),
    ],
    setColumnFilters,
    setGlobalFilter,
    setSorting,
    columnFilters,
    globalFilter,
    isLoading: false,
    pagination,
    isError: false,
    isFetching: false,
    sorting,
    columnPinning,
    setColumnPinning,
    refetch: false,
    handleDeleteRow,
    dispatch,
    handlePaginationChange,
    columnSizing,
  };
};

export default useMain;
