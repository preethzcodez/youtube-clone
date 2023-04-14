import React from "react";
import sadIcon from "../../assets/sad.png";

const Error = () => {
  return (
    <div className="w-full -mt-[60px] h-screen flex flex-col items-center justify-center">
      <div className="flex items-center">
        <img src={sadIcon} alt="" />
        <p className="px-4 text-4xl font-bold text-[#FA5252]">
          Uh! Oh! Page Not Found
        </p>
      </div>
      <div className="p-10 font-semibold text-base italic">
        Please note that this site is not a complete implementation of YouTube
        due to certain restrictions in the YouTube Data API.
      </div>
    </div>
  );
};

export default Error;
