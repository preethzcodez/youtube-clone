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
  const marginLeft = useSelector((store) => store.sidebar.minWidth);

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
      <div className="flex" style={{ marginLeft }}>
        <div className="flex p-4 flex-wrap justify-center">
          {mostPopularVideosList?.items?.map((video) => (
            <Link key={video.id} to={`/watch?v=${video.id}`}>
              <VideoCard videoData={video} />
            </Link>
          ))}
          {isLoading &&
            Array.apply(null, { length: 6 }).map((e, i) => {
              return <VideoCardShimmer key={i} />;
            })}
        </div>
      </div>{" "}
    </>
  );
};

export default VideosListContainer;
