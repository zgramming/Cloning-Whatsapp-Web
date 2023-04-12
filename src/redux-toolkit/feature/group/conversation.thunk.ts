import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

import {
  initializeDetailGroup,
  initializeMyGroup,
  setErrorDetailGroup,
  setErrorMyGroup,
  setLoadingDetailGroup,
  setLoadingMyGroup,
} from './conversation.slice';
import { ConversationGroupCreateDTO } from '@/interface/group/dto/group.create-group-group.dto';

export const asyncConversationDetail = createAsyncThunk(
  'conversation/conversationDetail',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingDetailGroup(true));
      const result = await API.getConversationDetail(id);
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

export const asyncMyGroup = createAsyncThunk(
  'conversation/myConversation',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingMyGroup(true));
      const result = await API.getMyConversation();

      dispatch(initializeMyGroup(result));
      return result;
    } catch (error) {
      const err = errorHandler(error);
      setErrorMyGroup(err.message);
      return rejectWithValue(err.message);
    } finally {
      dispatch(setLoadingMyGroup(false));
    }
  },
);

export const asyncCreatePrivateConversation = createAsyncThunk(
  'conversation/createPrivateConversation',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await API.createPrivateConversation(userId);
      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);

export const asyncCreateGroupConversation = createAsyncThunk(
  'conversation/createGroupConversation',
  async (data: ConversationGroupCreateDTO, { rejectWithValue }) => {
    try {
      const { name, participants, avatar } = data;

      const formData = new FormData();

      formData.append('name', name);

      // Send Array string into FormData
      participants.forEach((participant) => {
        formData.append('participants[]', participant);
      });

      if (avatar) formData.append('avatar', avatar);

      const result = await API.createGroupConversation(formData);
      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);
