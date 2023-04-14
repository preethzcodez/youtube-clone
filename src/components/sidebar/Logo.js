import React from "react";
import logoImage from "../../assets/logo.png";
import menuIcon from "../../assets/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { sidebarSlideToggle, sidebarToggle } from "../../redux/sidebarSlice";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_OPTIONS } from "./Sidebar";

const Logo = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((store) => store.sidebar.isOpen);
  const sidebarSlide = useSelector((store) => store.sidebar.sidebarSlide);
  const location = useLocation();

  return (
    <div className="flex items-center">
      <button
        className="h-10 w-10 border-solid overflow-hidden rounded-full hover:bg-black hover:bg-opacity-10"
        onClick={() =>
          dispatch(
            SIDEBAR_OPTIONS.some((item) => item.route === location.pathname)
              ? sidebarToggle(!sidebarOpen)
              : sidebarSlideToggle(!sidebarSlide)
          )
        }
      >
        <img className="h-10 p-2" src={menuIcon} alt="" />
      </button>
      <Link to="/">
        <img className="ml-4 h-5" height={20} src={logoImage} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
