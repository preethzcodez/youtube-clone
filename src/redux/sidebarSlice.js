import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
    minWidth: "60px",
    sidebarSlide: false,
    isUserProfileOpen: false,
  },
  reducers: {
    sidebarToggle: (state, action) => {
      state.isOpen = action.payload;
      state.sidebarSlide = false;
      if (action.payload) {
        state.minWidth = "160px";
      } else {
        state.minWidth = "60px";
      }
    },
    sidebarSlideToggle: (state, action) => {
      state.isOpen = true;
      state.sidebarSlide = action.payload;
    },
    userProfileToggle: (state, action) => {
      state.isUserProfileOpen = action.payload;
    },
  },
});

export const { sidebarToggle, sidebarSlideToggle, userProfileToggle } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
