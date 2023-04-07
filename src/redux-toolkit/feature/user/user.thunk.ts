import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserUpdateProfileDTO } from '@/interface/user/dto/user.update-profile.dto';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

import {
  initializeUserFilteredPhone,
  resetUserFilteredPhone,
  setErrorUserFilteredPhone,
  setLoadingUserFilteredPhone,
} from './user-filtered-phone.slice';

export const asyncUserByPhone = createAsyncThunk(
  'user/asyncUserByPhone',
  async (phone: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetUserFilteredPhone());
      const result = await API.getUserByPhone(phone);

      dispatch(initializeUserFilteredPhone(result));
      return result;
    } catch (error) {
      const err = errorHandler(error);
      dispatch(setErrorUserFilteredPhone(err.message));
      return rejectWithValue(err.message);
    } finally {
      dispatch(setLoadingUserFilteredPhone(false));
    }
  },
);

export const asyncUserUpdateProfile = createAsyncThunk(
  'user/asyncUserUpdateProfile',
  async (payload: UserUpdateProfileDTO, { rejectWithValue }) => {
    try {
      const { name, bio } = payload;
      const result = await API.updateProfile({
        name,
        bio,
      });

      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);

export const asyncUserUpdateProfilePicture = createAsyncThunk(
  'user/asyncUserUpdateProfilePicture',
  async (file: File, { rejectWithValue }) => {
    try {
      const result = await API.updateProfilePicture(file);

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Path: src\redux-toolkit\feature\user\user.thunk.ts
