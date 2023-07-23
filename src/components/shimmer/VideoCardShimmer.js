import React from "react";

const VideoCardShimmer = ({ videoCardWidth }) => {
  return (
    <div className=" animate-pulse">
      <div
        className="h-[200px] bg-slate-300 rounded-2xl"
        style={{ width: videoCardWidth }}
      ></div>
      <div className="mt-2 flex">
        <img
          className="w-10 h-10 bg-slate-300 rounded-full"
          src={null}
          alt=""
        />

        <div className="ml-2 flex flex-col flex-1">
          <div className="h-4 mt-1 w-full bg-slate-300"></div>
          <div className="h-2 mt-3 w-full bg-slate-300"></div>
          <div className="h-2 mt-2 w-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
