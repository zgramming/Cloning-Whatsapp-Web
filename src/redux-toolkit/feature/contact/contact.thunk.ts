import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactCreateDTO } from '@/interface/contact/dto/contact.create.dto';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

import { asyncMyGroup } from '../group/conversation.thunk';
import { initializeMyContact, setLoadingMyContact } from './contact.slice';

// eslint-disable-next-line import/prefer-default-export
export const asyncGetMyContact = createAsyncThunk('contact/getMyContact', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoadingMyContact(true));
    const response = await API.getMyContact();

    if (!response.status) {
      throw new Error(response.message);
    }

    dispatch(initializeMyContact(response.data));

    return response.data;
  } catch (error) {
    const result = errorHandler(error);
    return rejectWithValue(result.message);
  } finally {
    dispatch(setLoadingMyContact(false));
  }
});

export const asyncCreateContact = createAsyncThunk(
  'contact/createContact',
  async (payload: ContactCreateDTO, { dispatch, rejectWithValue }) => {
    try {
      const { conversationId, userId } = payload;
      const response = await API.addContact({ conversationId, userId });

      if (!response.status) {
        throw new Error(response.message);
      }

      // Re-fetch my group list after create new group
      dispatch(asyncMyGroup());

      return response;
    } catch (error) {
      const result = errorHandler(error);
      return rejectWithValue(result.message);
    }
  },
);

// Path: src\redux-toolkit\feature\contact\contact.thunk.ts
