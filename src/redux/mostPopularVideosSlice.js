import { createSlice } from "@reduxjs/toolkit";

const mostPopularVideosSlice = createSlice({
  name: "mostPopularVideos",
  initialState: {
    data: {
      items: [],
      nextPageToken: "",
    },
  },
  reducers: {
    setMostPopularVideos: (state, action) => {
      if (state.data.nextPageToken !== action.payload.nextPageToken) {
        state.data.items = [...state.data.items, ...action.payload.items];
        state.data.nextPageToken = action.payload.nextPageToken || null;
      }
    },
  },
});

export const { setMostPopularVideos } = mostPopularVideosSlice.actions;
export default mostPopularVideosSlice.reducer;
