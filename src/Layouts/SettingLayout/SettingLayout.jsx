import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { SideBar } from "Components/SideBar/SideBar";

const SettingLayout = () => {
  const expanded = useSelector((state) => state.sidebar.expand);

  const [switchResult, setSwitchResult] = useState([]);

  return (
    <div
      className="main"
      style={{
        marginLeft: `${expanded ? "240px" : "64px"}`,
      }}
    >
      <SideBar
        page="setting"
        header="Setting"
        setSwitchResult={setSwitchResult}
        switchResult={switchResult}
      />
      <Outlet context={{ hello: "js" }} />
    </div>
  );
};

export default SettingLayout;
