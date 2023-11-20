import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { SideBar } from "Components/SideBar/SideBar";

const MainLayout = () => {
  const expanded = useSelector((state) => state.sidebar.expand);

  return (
    <div
      className="main"
      style={{
        marginLeft: `${expanded ? "240px" : "64px"}`,
      }}
    >
      <SideBar page="main" header="Union" />
      <Outlet context={{ hello: "js" }} />
    </div>
  );
};

export default MainLayout;
