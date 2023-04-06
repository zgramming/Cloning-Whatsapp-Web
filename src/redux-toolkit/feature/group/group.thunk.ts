import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';
import {
  setLoadingDetailGroup,
  initializeDetailGroup,
  setErrorDetailGroup,
  setLoadingMyGroup,
  initializeMyGroup,
  setErrorMyGroup,
} from './group.slice';

export const asyncGroupDetail = createAsyncThunk(
  'group/groupDetail',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingDetailGroup(true));
      const result = await API.getGroupDetail(id);
      dispatch(initializeDetailGroup(result));
      return result;
    } catch (error) {
      const err = errorHandler(error);
      dispatch(setErrorDetailGroup(err.message));
      return rejectWithValue(err.message);
    } finally {
      dispatch(setLoadingDetailGroup(false));
    }
  },
);

export const asyncMyGroup = createAsyncThunk('group/myGroup', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoadingMyGroup(true));
    const result = await API.getMyGroup();

    dispatch(initializeMyGroup(result));
    return result;
  } catch (error) {
    const err = errorHandler(error);
    setErrorMyGroup(err.message);
    return rejectWithValue(err.message);
  } finally {
    dispatch(setLoadingMyGroup(false));
  }
});

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
