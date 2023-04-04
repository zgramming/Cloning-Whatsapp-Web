import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message, MessageInterface } from '@/interface/message/message.interface';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

type SliceType = {
  items: Message[];
  loading: boolean;
  error?: string;
};

const initialState: SliceType = {
  items: [],
  loading: true,
  error: undefined,
};

export const asyncMessage = createAsyncThunk('message/asyncMessage', async (groupId: string, { rejectWithValue }) => {
  try {
    const result = await API.getMessageByGroupId(groupId);
    return result;
  } catch (error) {
    const err = errorHandler(error);
    return rejectWithValue(err.message);
  }
});

export const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncMessage.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(asyncMessage.fulfilled, (state, action) => {
      state.loading = false;
      const items: MessageInterface = action.payload;
      state.items = [...items.data];
    });
    builder.addCase(asyncMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default messageSlice.reducer;
