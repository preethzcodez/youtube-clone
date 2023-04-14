import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/search-outlined.png";
import SearchSmallIcon from "../../assets/search-small-outlined.png";
import { SEARCH_SUGGESTIONS_API } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestionsCache } from "../../redux/searchSlice";
import closeIcon from "../../assets/close.png";

const Search = () => {
  const inputRef = useRef(null);
  const [isSearchFocused, setSearchFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const cachedSuggestions = useSelector(
    (store) => store.search.suggestionsCache
  );

  useEffect(() => {
    // debounce the search api call
    const timer = setTimeout(() => {
      // set the suggestion from the cache if exists
      if (cachedSuggestions[searchText]) {
        setSuggestions(cachedSuggestions[searchText]);
      } else {
        getSearchSugsestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const getSearchSugsestions = async () => {
    const data = await fetch(`${SEARCH_SUGGESTIONS_API}${searchText}`);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(setSuggestionsCache({ [searchText]: json[1] }));
  };

  return (
    <div className={`h-10 flex items-center bg-transparent basis-[728px]`}>
      <div
        className={`pl-4 ${
          isSearchFocused ? "flex" : "invisible"
        } left-0 bg-white h-10 items-center border rounded-l-full border-gray-500 border-r-0 relative`}
      >
        <img height="24px" width="24px" src={SearchIcon} alt="" />
        {isSearchFocused && (
          <div className="mt-1 w-[645px] bg-white absolute rounded border-transparent shadow shadow-slate-300 left-0 right-0 top-10 z-50">
            <ul>
              {suggestions.map((suggestion, index) => {
                return (
                  <li
                    key={index}
                    className="hover:bg-slate-200 cursor-pointer"
                    onMouseDown={() => setSearchText(suggestion)}
                  >
                    <div className="pl-5 p-2 flex items-center">
                      <img
                        height="16px"
                        width="16px"
                        src={SearchSmallIcon}
                        alt=""
                      />
                      <div className="pl-3">{suggestion}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full">
        <div
          className={`border  border-gray-500 h-10 flex items-center w-full ${
            isSearchFocused ? "border-s-0" : "rounded-s-full"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            className="ml-2 mr-1 pl-1 focus:border-none focus-visible:border-none focus-visible:outline-none w-full"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
          {searchText.trim().length > 0 && (
            <img
              src={closeIcon}
              className="cursor-pointer w-8 h-8 p-2"
              alt=""
              onClick={() => {
                setSearchText("");
                inputRef.current.focus();
              }}
            />
          )}
        </div>
      </div>
      <div className="pl-4 pr-6 bg-white h-10 items-center flex border rounded-r-full border-gray-500 border-l-0">
        <img height={30} width={30} src={SearchIcon} alt="" />
      </div>
    </div>
  );
};

export default Search;
