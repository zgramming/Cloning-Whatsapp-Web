import { createSlice } from '@reduxjs/toolkit';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import { ConversationDetail, ConversationDetailInterface } from '@/interface/group/conversation.detail.interface';
import { MyConversation, MyConversationInterface } from '@/interface/group/conversation.me.interface';

type SliceType = {
  items: MyConversation[];
  loading: boolean;
  error?: string;

  detail: {
    data?: ConversationDetail;
    loading: boolean;
    error?: string;
  };
};

const initialState: SliceType = {
  items: [],
  loading: true,
  error: undefined,
  detail: {
    data: undefined,
    loading: true,
    error: undefined,
  },
};

const groupSlice = createSlice({
  initialState,
  name: 'inbox',
  reducers: {
    initializeMyGroup: (state, action) => {
      const { data }: MyConversationInterface = action.payload;
      state.items = [...data];
    },
    setLoadingMyGroup: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMyGroup: (state, action) => {
      state.error = action.payload as string;
    },

    initializeDetailGroup: (state, action) => {
      const { data }: ConversationDetailInterface = action.payload;
      state.detail.data = data;
    },
    setLoadingDetailGroup: (state, action) => {
      state.detail.loading = action.payload;
    },
    setErrorDetailGroup: (state, action) => {
      state.detail.error = action.payload as string;
    },

    updateLastMessageGroup: (state, action) => {
      const response: MessageCreateResponseInterface = action.payload;
      const { data } = response;

      const index = state.items.findIndex((item) => item.id === data.conversation_id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          last_msg: data.message,
          last_sender: data.from,
        };
      }
    },
    addMessageToGroupDetail: (state, action) => {
      const response: MessageCreateResponseInterface = action.payload;
      const { data } = response;
      const { conversation_id: conversationId } = data;

      if (state.detail.data?.id !== conversationId) return;

      state.detail.data?.messages.push({ ...data });
    },
  },
});

export const {
  initializeMyGroup,
  setErrorMyGroup,
  setLoadingMyGroup,

  initializeDetailGroup,
  setErrorDetailGroup,
  setLoadingDetailGroup,

  updateLastMessageGroup,
  addMessageToGroupDetail,
} = groupSlice.actions;

export default groupSlice.reducer;
