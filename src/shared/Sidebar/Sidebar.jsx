import React, { useEffect, useRef, useState } from "react";
import "../../styles/Layout/_Sidebar.scss";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import logo from "../../assets/sidebar/logo.png";
import { ReactComponent as dashboard } from "../../assets/sidebar/dashboard.svg";
import { ReactComponent as customer } from "../../assets/sidebar/customer.svg";
import { ReactComponent as orders } from "../../assets/sidebar/orders.svg";
import { ReactComponent as banner } from "../../assets/sidebar/banner.svg";
import { ReactComponent as products } from "../../assets/sidebar/products.svg";
import { ReactComponent as notification } from "../../assets/sidebar/notification.svg";
import { ReactComponent as blogs } from "../../assets/sidebar/blogs.svg";
import { ReactComponent as faq } from "../../assets/sidebar/faq.svg";
import { ReactComponent as coupons } from "../../assets/sidebar/coupons.svg";
import { ReactComponent as wallet } from "../../assets/sidebar/wallet.svg";
import { ReactComponent as referrals } from "../../assets/sidebar/referrals.svg";
import { ReactComponent as subscription_plan } from "../../assets/sidebar/subscription_plan.svg";
import { ReactComponent as combo } from "../../assets/sidebar/combo.svg";
import { ReactComponent as all_about_fitness } from "../../assets/sidebar/all_about_fitness.svg";
import { ReactComponent as gym_guide } from "../../assets/sidebar/gym_guide.svg";
import { ReactComponent as LogoutIcon } from "../../assets/sidebar/logout.svg";

import { ReactComponent as ArrowUpDown } from "../../assets/sidebar/arrow_up_down.svg";
import { paths } from "../../utils/path";
import { open } from "../../redux/reducer/LogoutReducer";

export default function Sidebar({ sidebarRef }) {
  const dispatch = useDispatch();

  const [itemOpen, setItemOpen] = useState(0);
  const [sidebarElement, setSidebarElement] = useState([
    {
      title: "Dashboard",
      icon: dashboard,
      linkTo: "/dashboard",
      subItems: false,
    },
    {
      title: "Customer",
      icon: customer,
      linkTo: `/${paths?.front?.user?.customer}`,
      subItems: false,
    },
    {
      title: "Orders",
      icon: orders,
      linkTo: `/${paths?.front?.user?.orders}`,
      subItems: false,
    },
    {
      title: "Banner",
      icon: banner,
      linkTo: `/${paths?.front?.user?.banner}`,
      subItems: false,
    },
    {
      title: "Products",
      icon: products,
      linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.brands}`,
      subItems: false,
      // subItemList: [
      //   {
      //     title: "Product list",
      //     linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.product_list}`,
      //   },
      //   {
      //     title: "Brands",
      //     linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.brands}`,
      //   },
      //   {
      //     title: "Categories",
      //     linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.categories}`,
      //   },
      //   {
      //     title: "Sub categories",
      //     linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.sub_categories}`,
      //   },
      //   {
      //     title: "Add products",
      //     linkTo: `/${paths?.front?.user?.products}/${paths?.front?.user?.add_products}`,
      //   },
      // ],
    },
    {
      title: "Notification",
      icon: notification,
      linkTo: `/${paths?.front?.user?.notification}`,
      subItems: false,
    },
    {
      title: "Blogs",
      icon: blogs,
      linkTo: `/${paths?.front?.user?.blogs}/${paths?.front?.user?.blog_list}`,
      subItems: false,
      // subItemList: [
      //   {
      //     title: "Add blogs",
      //     linkTo: `/${paths?.front?.user?.blogs}/${paths?.front?.user?.add_blogs}`,
      //   },
      //   {
      //     title: "Blog list",
      //     linkTo: `/${paths?.front?.user?.blogs}/${paths?.front?.user?.blog_list}`,
      //   },
      // ],
    },
    {
      title: "FAQ's",
      icon: faq,
      linkTo: `/${paths?.front?.user?.faq}`,
      subItems: false,
    },
    {
      title: "Coupons",
      icon: coupons,
      linkTo: `/${paths?.front?.user?.coupons}`,
      subItems: false,
    },
    // {
    //   title: "Wallet",
    //   icon: wallet,
    //   linkTo: `/${paths?.front?.user?.wallet}`,
    //   subItems: false,
    // },
    {
      title: "Referrals",
      icon: referrals,
      linkTo: `/${paths?.front?.user?.referrals}`,
      subItems: false,
    },
    {
      title: "Subscription Plan",
      icon: subscription_plan,
      linkTo: `/${paths?.front?.user?.subscription_plan}`,
      subItems: false,
    },
    {
      title: "Combo/Deals",
      icon: combo,
      linkTo: `/${paths?.front?.user?.combo}`,
      subItems: true,
      subItemList: [
        {
          title: "Add combo category",
          linkTo: `/${paths?.front?.user?.combo}/${paths?.front?.user?.add_combo_category}`,
        },
        // {
        //   title: "Combo product list",
        //   linkTo: `/${paths?.front?.user?.combo}/${paths?.front?.user?.combo_product_list}`,
        // },
        {
          title: "Deals",
          linkTo: `/${paths?.front?.user?.combo}/${paths?.front?.user?.deals}`,
        },
      ],
    },
    {
      title: "All about fitness",
      icon: all_about_fitness,
      linkTo: `/${paths?.front?.user?.all_about_fitness}`,
      subItems: false,
    },
    {
      title: "Gym guide",
      icon: gym_guide,
      linkTo: `/${paths?.front?.user?.gym_guide}`,
      subItems: false,
    },
  ]);

  const handleDropdown = (e) => {
    const ul = e?.currentTarget?.nextSibling;
    ul?.classList?.toggle("display-block");
  };

  const setDropdown = (e) => {
    resetDropdown();
    e?.currentTarget?.parentElement?.previousSibling?.classList.add("active");
  };

  const resetDropdown = () => {
    const elements = document.querySelectorAll(
      ".sidebar__element__link__sublist_item.active"
    );
    for (const el of elements) {
      el.classList.remove("active");
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(
      "div.sidebar__element__link__sublist_item"
    );
    for (const el of elements) {
      let subItems = el.nextElementSibling.querySelectorAll(
        "a.sidebar__subitem__link"
      );
      for (const subItem of subItems) {
        if (subItem.getAttribute("aria-current") == "page") {
          el.classList.add("active");
          subItem.parentElement.style.display = "block";
          return;
        } else {
          el.classList.remove("active");
        }
      }
    }
  }, []);

  const closeSidebar = () => {
    if (sidebarRef?.current) {
      sidebarRef?.current?.classList?.remove("openSidebar");
    }
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      <IconButton className="sidebar__close_hamburger" onClick={closeSidebar}>
        <CloseIcon />
      </IconButton>
      <div className="sidebar__logo">
        <img src={logo} alt="Odravel" />
      </div>
      <ul className="sidebar__element">
        {sidebarElement?.map((Element, index) => {
          if (Element?.subItems) {
            return (
              <div className="sidebar__element__link" key={index}>
                <div
                  onClick={handleDropdown}
                  className="sidebar__element__link__sublist_item"
                >
                  <li className="sidebar__element__link__list">
                    <Element.icon className="sidebar__element__link__list__svg" />
                    <div>
                      <span>{Element?.title}</span>
                      <ArrowUpDown className="sidebar__element__link__sublist_item__arrow_svg" />
                    </div>
                  </li>
                </div>
                <ul style={{ cursor: "context-menu" }}>
                  {Element?.subItemList?.map((item, index1) => {
                    return (
                      <NavLink
                        key={`nav_subitem_${index1}`}
                        to={item?.linkTo}
                        className={`${({ isActive }) =>
                          isActive && "active-style"} sidebar__subitem__link`}
                        onClick={setDropdown}
                      >
                        <li>
                          <span></span>
                          {item?.title}
                        </li>
                      </NavLink>
                    );
                  })}
                </ul>
              </div>
            );
          } else {
            return (
              <NavLink
                key={index}
                to={Element?.linkTo}
                className={`${({ isActive }) =>
                  isActive && "active-style"} sidebar__element__link`}
                onClick={resetDropdown}
              >
                <li className="sidebar__element__link__list">
                  <Element.icon className="sidebar__element__link__list__svg" />
                  <span>{Element?.title}</span>
                </li>
              </NavLink>
            );
          }
        })}
        <a
          className={"sidebar__element__link"}
          onClick={() => {
            resetDropdown();
            dispatch(open());
          }}
        >
          <li className="sidebar__element__link__list">
            <LogoutIcon className="sidebar__element__link__list__svg" />
            <span>Logout</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
