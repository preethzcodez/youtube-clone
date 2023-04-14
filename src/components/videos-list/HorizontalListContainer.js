import React, { useEffect, useRef, useState } from "react";

const HorizontalListContainer = () => {
  const containerRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const buttons = [
    "All",
    "Mixed",
    "Programming",
    "AI",
    "News",
    "Sports",
    "Electronics",
    "Live",
    "Mobile",
    "Comedy",
    "Interview",
    "Cinema",
    "Business",
    "Education",
    "Road Trips",
    "Soccer",
    "Gadgets",
    "Recently uploaded",
    "Cricket",
    "Posts",
    "Watched",
    "Video",
    "Javascript",
    "Audio",
    "eFootball",
    "Playground",
    "React",
    "AWS",
    "Web",
    "New to you",
  ];

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft === 0) {
      setShowLeftButton(false);
    } else {
      setShowLeftButton(true);
    }
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  };

  const handleScrollLeft = () => {
    const container = containerRef.current;
    container.scrollTo({
      left: container.scrollLeft - 100,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    container.scrollTo({
      left: container.scrollLeft + 100,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setScrollStart(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      containerRef.current.scrollTo({
        left: scrollStart + dragStart - e.clientX,
        behavior: "auto",
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="ml-6 relative">
      <div
        className="flex overflow-x-auto no-scrollbar items-center ml-4 mr-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        {buttons.map((button, index) => {
          return (
            <button
              className="mt-1 hover:bg-black z-40 hover:text-white whitespace-nowrap ml-2 mr-2 pl-2 pr-2 pt-1 pb-1 rounded bg-slate-100 text-sm font-medium text-gray-500 h-fit"
              key={index}
            >
              {button}
            </button>
          );
        })}
      </div>
      {showLeftButton && (
        <button
          className="hover:bg-gray-200 absolute z-40 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 left-0"
          onClick={handleScrollLeft}
        >
          &lt;
        </button>
      )}
      {showRightButton && (
        <button
          className="hover:bg-gray-200 absolute z-40 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md right-3"
          onClick={handleScrollRight}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default HorizontalListContainer;
