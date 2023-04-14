import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar, { SIDEBAR_OPTIONS } from "./components/sidebar/Sidebar";
import VideosListContainer from "./components/videos-list/VideosListContainer";
import { useEffect, useMemo } from "react";
import WatchVideo from "./components/watch-video/WatchVideo";
import { useDispatch, useSelector } from "react-redux";
import { sidebarSlideToggle, sidebarToggle } from "./redux/sidebarSlice";
import UserProfile from "./components/header/UserProfile";
import Error from "./components/error/Error";
import { useRef } from "react";

/**
 * Header
 * Sidebar Body
 * @returns
 */
function App() {
  const marginLeft = useSelector((store) => store.sidebar.minWidth);
  const sidebarSlide = useSelector((store) => store.sidebar.sidebarSlide);
  const isUserProfileOpen = useSelector(
    (store) => store.sidebar.isUserProfileOpen
  );
  const location = useLocation();
  const dispatch = useDispatch();

  const isNonSidebarRoute = useMemo(
    () => !SIDEBAR_OPTIONS.some((item) => item.route === location.pathname),
    [location.pathname]
  );

  // set sidebar to expanded mode for all pages except sidebar routes
  useEffect(() => {
    if (isNonSidebarRoute) {
      dispatch(sidebarToggle(true));
    }
  }, [location.pathname]);

  return (
    <>
      {isNonSidebarRoute && sidebarSlide && (
        <div
          className="w-screen h-screen bg-black opacity-70 fixed top-0 left-0 z-40"
          onClick={() => dispatch(sidebarSlideToggle(false))}
        />
      )}
      <Header />
      <Sidebar />
      {isUserProfileOpen && <UserProfile />}
      <div
        className="mt-[60px]"
        style={{ marginLeft: location.pathname === "/" ? marginLeft : "100px" }}
      >
        <Outlet />
      </div>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <VideosListContainer />,
      },
      {
        path: "/watch",
        element: <WatchVideo />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default appRouter;
