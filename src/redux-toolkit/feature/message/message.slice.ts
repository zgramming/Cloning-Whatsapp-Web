import { createSlice } from '@reduxjs/toolkit';

type SliceType = {
  messageTyping: {
    group_id: string | undefined;
    name: string | undefined;
    is_typing: boolean;
  };
};

const initialState: SliceType = {
  messageTyping: {
    name: undefined,
    group_id: undefined,
    is_typing: false,
  },
};

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    updateMessageTyping: (state, action) => {
      const { group_id: groupId, name, is_typing: isTyping } = action.payload;
      state.messageTyping.name = name;
      state.messageTyping.group_id = groupId;
      state.messageTyping.is_typing = isTyping;
    },
    resetMessageTyping: (state) => {
      state.messageTyping.name = undefined;
      state.messageTyping.is_typing = false;
      state.messageTyping.group_id = undefined;
    },
  },
});

export const { updateMessageTyping, resetMessageTyping } = messageSlice.actions;

export default messageSlice.reducer;
