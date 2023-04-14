import React, { useEffect, useRef } from "react";
import instaIcon from "../../assets/insta.png";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import close from "../../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { userProfileToggle } from "../../redux/sidebarSlice";
import { PROFILE_PIC } from "../../utils/constants";

const UserProfile = () => {
  const divRef = useRef(null);
  const isUserProfileOpen = useSelector(
    (store) => store.sidebar.isUserProfileOpen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // close user profile on outside click
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        dispatch(userProfileToggle(!isUserProfileOpen));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <div
      className="fixed p-4 top-10 right-10 bg-white z-50 flex flex-col w-[400px] border border-gray-300 rounded-lg shadow-md"
      ref={divRef}
    >
      <img
        src={close}
        alt=""
        className="w-4 h-4 cursor-pointer self-end -mt-1 z-50"
        onClick={() => dispatch(userProfileToggle(false))}
      />
      <div className="flex border-b py-4 -mt-5">
        <img
          src={PROFILE_PIC}
          alt=""
          className="w-12 h-12 rounded-full"
        ></img>
        <div className="ml-3">
          <p className="font-medium">Preeth Prathapan</p>
          <a
            href="https://github.com/preethzcodez"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-sm hover:underline">@preethzcodez</p>
          </a>
          <div className="flex mt-4">
            <a
              href="https://www.instagram.com/preeth_prathapan_/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instaIcon} height={40} width={40} alt=""></img>
            </a>
            <a
              href="https://github.com/preethzcodez"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                height={40}
                width={40}
                alt=""
                className="mx-4"
              ></img>
            </a>
            <a
              href="https://www.linkedin.com/in/preethzcodez/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedinIcon} height={40} width={40} alt=""></img>
            </a>
          </div>
        </div>
      </div>
      <div className="border-b py-4 text-sm">
        <p>
          This YouTube clone was developed using the free version of the YouTube
          Data API.
        </p>
      </div>
      <div className="border-b py-4">
        <p className="font-medium">Features Implemented</p>
        <ul className="text-xs">
          <li className="pt-1">Videos List</li>
          <li className="pt-1">Search Suggestions (Debouncing and Caching)</li>
          <li className="pt-1">Nested Comments (Recursion - Mock Data)</li>
          <li className="pt-1">Live Chat (Mock Data)</li>
          <li className="pt-1">Sidebar</li>
          <li className="pt-1">Horizontal Slider</li>
          <li className="pt-1">iFrame Video Player</li>
        </ul>
      </div>
      <div className="py-4">
        <p className="font-medium">Tools Used</p>
        <ul className="text-xs">
          <li className="pt-1">React</li>
          <li className="pt-1">Redux Toolkit</li>
          <li className="pt-1">Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
