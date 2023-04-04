import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

export const asyncCreatePrivateGroup = createAsyncThunk(
  'group/createPrivateGroup',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await API.createPrivateGroup(userId);
      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);

export const asyncMyGroup = createAsyncThunk('group/myGroup', async (_, { rejectWithValue }) => {
  try {
    const result = await API.getMyGroup();
    return result;
  } catch (error) {
    const err = errorHandler(error);
    return rejectWithValue(err.message);
  }
});
