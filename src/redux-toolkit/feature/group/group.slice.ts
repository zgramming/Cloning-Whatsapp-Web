import { createSlice } from '@reduxjs/toolkit';
import { MyGroup, MyGroupInterface } from '@/interface/group/my-group.response.interface';

import { asyncMyGroup } from './group.thunk';

type SliceType = {
  items: MyGroup[];
  loading: boolean;
  error?: string;
};

const initialState: SliceType = {
  items: [],
  loading: true,
  error: undefined,
};

const groupSlice = createSlice({
  initialState,
  name: 'inbox',
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default groupSlice.reducer;
