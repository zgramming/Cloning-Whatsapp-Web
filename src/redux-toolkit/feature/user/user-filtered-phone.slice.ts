import { createSlice } from '@reduxjs/toolkit';
import { UserSearchByPhoneInterface } from '@/interface/user/user-search-by-phone.interface';

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

const userFilteredPhoneSlice = createSlice({
  initialState,
  name: 'userFilteredPhone',
  reducers: {
    resetUserFilteredPhone: (state) => {
      state.response = undefined;
      state.loading = true;
      state.error = undefined;
    },
    initializeUserFilteredPhone: (state, action) => {
      const item = action.payload as UserSearchByPhoneInterface;
      state.response = item;
    },
    setLoadingUserFilteredPhone: (state, action) => {
      state.loading = action.payload;
    },
    setErrorUserFilteredPhone: (state, action) => {
      state.error = action.payload as string;
    },
  },
});

export const {
  resetUserFilteredPhone,
  initializeUserFilteredPhone,
  setErrorUserFilteredPhone,
  setLoadingUserFilteredPhone,
} = userFilteredPhoneSlice.actions;

export default userFilteredPhoneSlice.reducer;
