import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserInterface, UserResponseInterface } from '@/interface/user/user.interface';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

type SliceType = {
  user?: UserInterface;
  loading: boolean;
  error?: string;
};

const initialState: SliceType = {
  user: undefined,
  loading: true,
  error: undefined,
};

export const asyncUserByPhone = createAsyncThunk(
  'user/asyncUserByPhone',
  async (phone: string, { rejectWithValue }) => {
    try {
      const result = await API.getUserByPhone(phone);

      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);

export const userFilteredPhoneSlice = createSlice({
  initialState,
  name: 'userFilteredPhone',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncUserByPhone.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(asyncUserByPhone.fulfilled, (state, action) => {
      state.loading = false;
      const item: UserResponseInterface = action.payload;
      state.user = item.data;
    });
    builder.addCase(asyncUserByPhone.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userFilteredPhoneSlice.reducer;
