import { configureStore } from "@reduxjs/toolkit";
import mostPopularVideosSlice from "./mostPopularVideosSlice";
import searchSlice from "./searchSlice";
import sidebarSlice from "./sidebarSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    mostPopularVideos: mostPopularVideosSlice,
    search: searchSlice,
    sidebar: sidebarSlice,
    chat: chatSlice
  },
});

export default store;
