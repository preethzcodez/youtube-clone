import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMostPopularVideos } from "../../redux/mostPopularVideosSlice";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";
import VideoCard from "./VideoCard";
import {
  API_KEY,
  API_BASE_URL,
  mostPopularVideosAPI,
} from "../../utils/constants";
import { Link } from "react-router-dom";
import HorizontalListContainer from "./HorizontalListContainer";

const VideosListContainer = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const mostPopularVideosList = useSelector(
    (store) => store.mostPopularVideos.data
  );
  const videosListRef = useRef(mostPopularVideosList);
  const containerRef = useRef(null);
  const [videoCardWidth, setVideoCardWidth] = useState(`${316}px`);
  const sidebarOpen = useSelector((store) => store.sidebar.isOpen);

  useEffect(() => {
    fetchMostPopular(mostPopularVideosList?.nextPageToken);

    // add scroll listeners for infinite scrolling
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    videosListRef.current = mostPopularVideosList;
  }, [mostPopularVideosList]);

  useEffect(() => {
    const updateDivWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const itemsPerRow = Math.floor(newWidth / 316);
        let itemWidth = newWidth / itemsPerRow - 16;
        itemWidth = itemWidth < 300 ? 316 : itemWidth;
        setVideoCardWidth(`${Math.floor(itemWidth)}px`);
      }
    };

    // Call the function once to get the initial width
    updateDivWidth();

    // Attach the throttled event listener on window resize
    window.addEventListener("resize", updateDivWidth);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, [sidebarOpen]);

  const handleScroll = () => {
    const pageToken = videosListRef?.current?.nextPageToken;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && pageToken !== null) {
      fetchMostPopular(pageToken);
    }
  };

  const fetchMostPopular = async (pageToken) => {
    setLoading(true);
    const fetchData = await fetch(
      `${API_BASE_URL}${mostPopularVideosAPI}${API_KEY}&pageToken=${pageToken}`
    );
    const dataJson = await fetchData.json();
    setLoading(false);
    dispatch(setMostPopularVideos(dataJson));
  };

  return (
    <>
      <HorizontalListContainer />
      <div
        ref={containerRef}
        className="flex m-4 ml-11" /* style={{ marginLeft }} */
      >
        <div className="flex gap-4 flex-wrap justify-start">
          {mostPopularVideosList?.items?.map((video) => (
            <Link key={video.id} to={`/watch?v=${video.id}`}>
              <VideoCard videoData={video} videoCardWidth={videoCardWidth} />
            </Link>
          ))}
          {isLoading &&
            Array.apply(null, { length: 20 }).map((e, i) => {
              return <VideoCardShimmer key={i} videoCardWidth={videoCardWidth} />;
            })}
        </div>
      </div>{" "}
    </>
  );
};

export default VideosListContainer;
