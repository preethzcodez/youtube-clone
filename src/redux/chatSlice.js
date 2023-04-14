import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "../utils/constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.chatMessages.unshift(action.payload);
      if (state.chatMessages.length >= LIVE_CHAT_COUNT) {
        let itemsToRemove = state.chatMessages.length - (LIVE_CHAT_COUNT - 1);
        state.chatMessages.splice(LIVE_CHAT_COUNT, itemsToRemove);
      }
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
