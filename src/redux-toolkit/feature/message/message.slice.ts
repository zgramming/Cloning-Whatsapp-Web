import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
  messageTyping: {
    conversation_id: string | undefined;
    name: string | undefined;
    is_typing: boolean;
  };
};

const initialState: SliceType = {
  messageTyping: {
    name: undefined,
    conversation_id: undefined,
    is_typing: false,
  },
};

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    updateMessageTyping: (state, action) => {
      const { conversation_id: conversationId, name, is_typing: isTyping } = action.payload;
      state.messageTyping.name = name;
      state.messageTyping.conversation_id = conversationId;
      state.messageTyping.is_typing = isTyping;
    },
    resetMessageTyping: (state) => {
      state.messageTyping.name = undefined;
      state.messageTyping.is_typing = false;
      state.messageTyping.conversation_id = undefined;
    },
  },
});

export const { updateMessageTyping, resetMessageTyping } = messageSlice.actions;

export default messageSlice.reducer;
