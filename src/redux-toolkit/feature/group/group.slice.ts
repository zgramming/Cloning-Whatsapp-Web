import { createSlice } from '@reduxjs/toolkit';
import { GroupDetail, GroupDetailInterface } from '@/interface/group/group.detail.interface';
import { MyGroup, MyGroupInterface } from '@/interface/group/group.me.interface';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';

import { asyncGroupDetail, asyncMyGroup } from './group.thunk';

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
  extraReducers: (builder) => {
    /// my group
    builder.addCase(asyncMyGroup.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(asyncMyGroup.fulfilled, (state, action) => {
      state.loading = false;
      const items: MyGroupInterface = action.payload;
      state.items = [...items.data];
    });
    builder.addCase(asyncMyGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /// detail group
    builder.addCase(asyncGroupDetail.pending, (state) => {
      state.detail.loading = true;
      state.detail.error = undefined;
    });
    builder.addCase(asyncGroupDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      const response: GroupDetailInterface = action.payload;
      state.detail.data = response.data;
    });
    builder.addCase(asyncGroupDetail.rejected, (state, action) => {
      state.detail.loading = false;
      state.detail.error = action.payload as string;
    });
  },
});

export const { updateLastMessageGroup, addMessageToGroupDetail } = groupSlice.actions;

export default groupSlice.reducer;
