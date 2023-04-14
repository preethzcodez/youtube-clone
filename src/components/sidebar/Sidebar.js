import React from "react";
import Logo from "./Logo";
import homeIconOutlined from "../../assets/home-outlined.png";
import musicIconOutlined from "../../assets/music-outlined.png";
import moviesIconOutlined from "../../assets/movies-outlined.png";
import liveIconOutlined from "../../assets/live-outlined.png";
import newsIconOutlined from "../../assets/news-outlined.png";
import sportsIconOutlined from "../../assets/sports-outlined.png";
import learningIconOutlined from "../../assets/learning-outlined.png";
import gamingIconOutlined from "../../assets/game-outlined.png";
import homeIconFilled from "../../assets/home-filled.png";
import musicIconFilled from "../../assets/music-filled.png";
import moviesIconFilled from "../../assets/movies-filled.png";
import liveIconFilled from "../../assets/live-filled.png";
import newsIconFilled from "../../assets/news-filled.png";
import sportsIconFilled from "../../assets/sports-filled.png";
import learningIconFilled from "../../assets/learning-filled.png";
import gamingIconFilled from "../../assets/game-filled.png";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const SIDEBAR_OPTIONS = [
  {
    id: 1,
    route: "/",
    title: "Home",
    icon: homeIconOutlined,
    iconSelected: homeIconFilled,
  },
  {
    id: 2,
    route: "/music",
    title: "Music",
    icon: musicIconOutlined,
    iconSelected: musicIconFilled,
  },
  {
    id: 3,
    route: "/movies",
    title: "Movies",
    icon: moviesIconOutlined,
    iconSelected: moviesIconFilled,
  },
  {
    id: 4,
    route: "/live",
    title: "Live",
    icon: liveIconOutlined,
    iconSelected: liveIconFilled,
  },
  {
    id: 5,
    route: "/news",
    title: "News",
    icon: newsIconOutlined,
    iconSelected: newsIconFilled,
  },
  {
    id: 6,
    route: "/gaming",
    title: "Gaming",
    icon: gamingIconOutlined,
    iconSelected: gamingIconFilled,
  },
  {
    id: 7,
    route: "/sports",
    title: "Sports",
    icon: sportsIconOutlined,
    iconSelected: sportsIconFilled,
  },
  {
    id: 8,
    route: "/learning",
    title: "Learning",
    icon: learningIconOutlined,
    iconSelected: learningIconFilled,
  },
];

const Sidebar = () => {
  const sidebarOpen = useSelector((store) => store.sidebar.isOpen);
  const location = useLocation();
  const sidebarSlide = useSelector((store) => store.sidebar.sidebarSlide);

  // sidebar animation for all pages except the sidebar routes
  const getSidebarAnimationClass = () => {
    if (SIDEBAR_OPTIONS.some((item) => item.route === location.pathname))
      return "";
    return sidebarSlide
      ? "bg-white transform translate-x-0 transition ease-out"
      : "transform -translate-x-full transition ease-in";
  };

  // get menu selected
  const isSelected = (() => {
    const cache = {};
    return (item) => {
      if (cache[item.title] !== undefined) {
        return cache[item.title];
      }
      let selected = false;
      if (location.pathname === item.route) {
        selected = true;
      }
      cache[item.title] = selected;
      return selected;
    };
  })();

  return (
    <div
      className={`${getSidebarAnimationClass()} ${
        sidebarOpen ? "min-w-[190px]" : ""
      } pr-4 fixed left-0 top-0 h-screen z-40`}
    >
      <div className="pl-4 h-14 flex items-center">
        <Logo />
      </div>
      <div className={sidebarOpen ? "w-full" : "w-16"}>
        <ul className={!sidebarOpen ? "flex flex-col items-center" : ""}>
          {SIDEBAR_OPTIONS.map((item) => {
            return (
              <li key={item.id} className="mb-2">
                <Link to={item.route}>
                  <div
                    className={`cursor-pointer ml-2 flex rounded-lg pt-2 pb-2 items-center hover:font-medium  ${
                      !sidebarOpen
                        ? "w-[60px] justify-center hover:bg-slate-200"
                        : ""
                    } ${isSelected(item) ? "font-medium bg-slate-200" : ""}`}
                    style={{
                      paddingLeft: sidebarOpen ? "15px" : "",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        height={24}
                        width={24}
                        src={isSelected(item) ? item.iconSelected : item.icon}
                        alt=""
                      />
                      {!sidebarOpen && (
                        <div className="text-xs">{item.title}</div>
                      )}
                    </div>
                    {sidebarOpen && (
                      <span
                        className={`text-sm ml-4 ${
                          isSelected(item) && "font-medium"
                        }`}
                      >
                        {item.title}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {sidebarOpen && (
        <p className="absolute bottom-0 p-4 text-xs text-gray-500">
          © 2023 Preeth Prathapan
        </p>
      )}
    </div>
  );
};

export default Sidebar;
