import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    suggestionsCache: {},
  },
  reducers: {
    setSearchResults: (state, action) => {},
    setSuggestionsCache: (state, action) => {
      state.suggestionsCache = {
        ...state.suggestionsCache,
        ...action.payload,
      };
    },
  },
});

export const { setMostPopularVideos, setSuggestionsCache } =
  searchSlice.actions;
export default searchSlice.reducer;
