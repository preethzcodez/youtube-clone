import React, { useEffect, useState } from "react";
import { CHANNEL_DETAILS_API, VIDEO_DETAILS_API } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { formatDate, viewsNumberFormatter } from "../../utils/utilHelper";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchVideo = () => {
  const [videoDetails, setVideoDetails] = useState();
  const [searchParams] = useSearchParams();
  const [channelDetails, setChannelDetails] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 250;

  useEffect(() => {
    // fetch video data
    const fetchVideoData = async () => {
      const videoData = await fetch(
        `${VIDEO_DETAILS_API}${searchParams.get("v")}`
      );
      const jsonData = await videoData.json();
      setVideoDetails(jsonData);
    };
    fetchVideoData();
  }, []);

  useEffect(() => {
    if (videoDetails) {
      fetchChannelData(videoDetails?.items[0]?.snippet?.channelId);
    }
  }, [videoDetails]);

  // fetch channel data
  const fetchChannelData = async (channelId) => {
    const channelData = await fetch(`${CHANNEL_DETAILS_API}${channelId}`);
    const jsonData = await channelData.json();
    setChannelDetails(jsonData.items[0]);
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="w-[69%]">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {videoDetails && (
            <>
              <div className="mt-4 font-semibold text-xl">
                {videoDetails?.items[0]?.snippet?.title}
              </div>
              <div className="flex mt-4">
                <div className="h-10 w-10 rounded-full bg-slate-200">
                  <img
                    className="h-10 w-10 rounded-full"
                    alt=""
                    src={channelDetails?.snippet?.thumbnails?.default?.url}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">
                    {videoDetails?.items[0]?.snippet?.channelTitle}
                  </p>
                  <p className="text-xs font-normal text-gray-500">{`${viewsNumberFormatter(
                    channelDetails?.statistics?.subscriberCount
                  )} subscribers`}</p>
                </div>
              </div>
              <div className="mt-4 w-full bg-slate-200 rounded-lg mb-4">
                <div className="font-semibold p-3">{`${viewsNumberFormatter(
                  videoDetails?.items[0]?.statistics?.viewCount
                )} views ${formatDate(
                  videoDetails?.items[0]?.snippet?.publishedAt
                )}`}</div>
                <div className=" pl-3 pr-3 pb-3 whitespace-pre-line">
                  {isExpanded
                    ? videoDetails?.items[0]?.snippet?.description
                    : videoDetails?.items[0]?.snippet?.description.slice(
                        0,
                        MAX_CHARS
                      )}
                </div>
                <button
                  className="pl-3 pb-3 font-semibold cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              </div>
            </>
          )}
        </div>
        <LiveChat />
      </div>
      <CommentsContainer />
    </div>
  );
};

export default WatchVideo;
