import React from "react";
import Search from "./Search";
import Logo from "../sidebar/Logo";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfileToggle } from "../../redux/sidebarSlice";
import { PROFILE_PIC } from "../../utils/constants";

const Header = () => {
  const location = useLocation();
  const isUserProfileOpen = useSelector(
    (store) => store.sidebar.isUserProfileOpen
  );
  const dispatch = useDispatch();

  return (
    <div
      className={`h-14 flex items-center pl-4 pr-4 justify-between fixed top-0 w-full ${
        location.pathname === "/" ? "z-50" : "z-30"
      } bg-white`}
    >
      {/** Sidebar Button and Logo Div */}
      <Logo />

      {/** Search Panel */}
      <Search />

      {/** Profile Pic */}
      <img
        className="w-8 h-8 cursor-pointer rounded-full"
        src={PROFILE_PIC}
        alt=""
        onClick={() => dispatch(userProfileToggle(!isUserProfileOpen))}
      />
    </div>
  );
};

export default Header;
