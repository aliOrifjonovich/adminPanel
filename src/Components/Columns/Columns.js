export const columns = (tab_name) => {
  switch (tab_name) {
    case "user":
      return [
        {
          accessorFn: (row) => row.first_name,
          header: "First name",
        },
        {
          accessorFn: (row) => row.last_name,
          header: "Last name",
        },
        {
          accessorFn: (row) => row.username,
          header: "User name",
        },
        {
          accessorFn: (row) => row.role_data?.name,
          header: "Role name",
        },
      ];

    default:
      return [];
  }
};
