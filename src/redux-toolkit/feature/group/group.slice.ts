import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MyGroup, MyGroupInterface } from '@/interface/group/my-group.response.interface';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

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

export const asyncMyGroup = createAsyncThunk('group/myGroup', async (_, { rejectWithValue }) => {
  try {
    const result = await API.getMyGroup();
    return result;
  } catch (error) {
    const err = errorHandler(error);
    return rejectWithValue(err.message);
  }
});

export const groupSlice = createSlice({
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
