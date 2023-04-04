import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserSearchByPhoneInterface } from '@/interface/user/user-search-by-phone.interface';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

type SliceType = {
  response?: UserSearchByPhoneInterface;
  loading: boolean;
  error?: string;
};

const initialState: SliceType = {
  response: undefined,
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

const userFilteredPhoneSlice = createSlice({
  initialState,
  name: 'userFilteredPhone',
  reducers: {
    resetUserFilteredPhone: (state) => {
      state.response = undefined;
      state.loading = true;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUserByPhone.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(asyncUserByPhone.fulfilled, (state, action) => {
      state.loading = false;
      const item: UserSearchByPhoneInterface = action.payload;
      state.response = item;
    });
    builder.addCase(asyncUserByPhone.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetUserFilteredPhone } = userFilteredPhoneSlice.actions;

export default userFilteredPhoneSlice.reducer;
