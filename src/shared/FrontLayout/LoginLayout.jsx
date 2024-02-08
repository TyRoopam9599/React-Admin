import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import "../../styles/main.scss";
import Logo from "../../assets/sidebar/logo.png";

const Frontlayout = () => {
  const sidebarRef = useRef(null);
  const openSidebar = () => {
    if (sidebarRef?.current) {
      sidebarRef?.current?.classList?.add("openSidebar");
    }
  };
  return (
    <div className="login_main">
      <img src={Logo} alt="Odravel" className="login_main__logo" />
      <div className="login_main__outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Frontlayout;
