import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactCreateDTO } from '@/interface/dto/contact.create.dto';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

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
  async (payload: ContactCreateDTO, { rejectWithValue }) => {
    try {
      const { groupId, userId } = payload;
      const response = await API.addContact({ groupId, userId });

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      const result = errorHandler(error);
      return rejectWithValue(result.message);
    }
  },
);

// Path: src\redux-toolkit\feature\contact\contact.thunk.ts
