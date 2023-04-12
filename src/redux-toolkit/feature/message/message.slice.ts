import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
  messageTyping: {
    [conversationId: string]: {
      name: string | undefined;
      conversation_id: string | undefined;
      is_typing: boolean;
    };
  };
};

const initialState: SliceType = {
  messageTyping: {},
};

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    updateMessageTyping: (state, action) => {
      const { conversation_id: conversationId, name, is_typing: isTyping } = action.payload;

      if (state.messageTyping[conversationId]) {
        state.messageTyping[conversationId].name = name;
        state.messageTyping[conversationId].is_typing = isTyping;
        state.messageTyping[conversationId].conversation_id = conversationId;
      } else {
        state.messageTyping[conversationId] = {
          name,
          conversation_id: conversationId,
          is_typing: isTyping,
        };
      }
    },
    resetMessageTyping: (state, action) => {
      const { conversation_id: conversationId } = action.payload;

      if (state.messageTyping[conversationId]) {
        state.messageTyping[conversationId].name = undefined;
        state.messageTyping[conversationId].is_typing = false;
        state.messageTyping[conversationId].conversation_id = undefined;
      } else {
        state.messageTyping[conversationId] = {
          name: undefined,
          conversation_id: undefined,
          is_typing: false,
        };
      }
    },
  },
});

export const { updateMessageTyping, resetMessageTyping } = messageSlice.actions;

export default messageSlice.reducer;
