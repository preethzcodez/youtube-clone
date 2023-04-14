import React from "react";

const SearchShimmer = () => {
  return (
    <div className="flex p-2 animate-pulse">
      <div className="w-[340px] h-[225px] bg-slate-300 rounded-2xl">
        <img src={null} alt="" />
      </div>
      <div className="ml-4 flex flex-col flex-1">
        <div className="bg-slate-300 h-4 w-full"></div>
        <div className="mt-2 h-2 w-full bg-slate-300"></div>
        <div className="mt-4 flex items-center">
          <div className="h-6 w-6 rounded-full bg-slate-300"></div>
          <div className="w-full ml-2 h-2 bg-slate-300"></div>
        </div>
        <div className="w-full mt-4 h-2 bg-slate-300 text-xs"></div>
      </div>
    </div>
  );
};

export default SearchShimmer;
