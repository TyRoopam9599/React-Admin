import React, { useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/main.scss";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton } from "@mui/material";

const Frontlayout = () => {
  const sidebarRef = useRef(null);
  const openSidebar = () => {
    if (sidebarRef?.current) {
      sidebarRef?.current?.classList?.add("openSidebar");
    }
  };
  return (
    <div className="main">
      <IconButton className="open_sidebar__hamburger" onClick={openSidebar}>
        <DehazeIcon />
      </IconButton>
      <Sidebar sidebarRef={sidebarRef} />
      <div className="main__outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Frontlayout;
