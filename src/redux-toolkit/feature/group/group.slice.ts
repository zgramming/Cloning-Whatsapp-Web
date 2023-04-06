import { createSlice } from '@reduxjs/toolkit';
import { GroupDetail, GroupDetailInterface } from '@/interface/group/group.detail.interface';
import { MyGroup, MyGroupInterface } from '@/interface/group/group.me.interface';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';

type SliceType = {
  items: MyGroup[];
  loading: boolean;
  error?: string;

  detail: {
    data?: GroupDetail;
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
      const { data }: MyGroupInterface = action.payload;
      state.items = [...data];
    },
    setLoadingMyGroup: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMyGroup: (state, action) => {
      state.error = action.payload as string;
    },

    initializeDetailGroup: (state, action) => {
      const { data }: GroupDetailInterface = action.payload;
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

      const index = state.items.findIndex((item) => item.id === data.group_id);
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
      const { group_id: groupId } = data;

      if (state.detail.data?.id !== groupId) return;

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
