import React, { useEffect, useState } from "react";
import { formatDate, viewsNumberFormatter } from "../../utils/utilHelper";
import { CHANNEL_DETAILS_API } from "../../utils/constants";

const VideoCard = ({ videoData, videoCardWidth }) => {
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
    <div className="cursor-pointer" style={{ width: videoCardWidth }}>
      <div className="h-auto bg-slate-300 rounded-2xl overflow-hidden">
        <img
          src={videoData?.snippet?.thumbnails?.maxres?.url}
          alt="video thumbnail"
          loading="lazy"
        />
      </div>
      <div className="mt-2 flex">
        <img
          className="w-10 h-10 bg-slate-300 rounded-full"
          src={channelImageUrl}
          alt="channel thumbnail"
          loading="lazy"
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
