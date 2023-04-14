import React, { useEffect, useState } from "react";
import { formatDate, viewsNumberFormatter } from "../../utils/utilHelper";
import {
  CHANNEL_DETAILS_API,
} from "../../utils/constants";

const VideoCard = ({ videoData }) => {
  const [channelImageUrl, setChannelImageUrl] = useState(null);

  // fetch channel image
  useEffect(() => {
    const fetchChannelImage = async () => {
      const response = await fetch(
        `${CHANNEL_DETAILS_API}${videoData?.snippet?.channelId}`
      );
      const data = await response.json();
      setChannelImageUrl(data?.items?.[0]?.snippet?.thumbnails?.default?.url);
    };
    fetchChannelImage();
  }, [videoData?.snippet?.channelId]);

  return (
    <div className="p-4 cursor-pointer">
      <div className="w-[300px] h-[160px] bg-slate-300 rounded-2xl overflow-hidden">
        <img
          /* className="w-[360px] h-[200px]" */
          src={videoData?.snippet?.thumbnails?.maxres?.url}
          alt=""
        />
      </div>
      <div className="w-[300px] mt-2 flex">
        <img
          className="w-10 h-10 bg-slate-300 rounded-full"
          src={channelImageUrl}
          alt=""
        />

        <div className="ml-2 flex flex-col flex-1">
          <div className="font-medium">{videoData?.snippet?.title}</div>
          <div className="font-normal text-slate-500 text-sm">
            {videoData?.snippet?.channelTitle}
          </div>
          <div className="font-normal text-slate-500 text-sm">
            <span>{`${viewsNumberFormatter(
              videoData?.statistics?.viewCount
            )} Views`}</span>
            {" • "}
            <span>{formatDate(videoData?.snippet?.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
