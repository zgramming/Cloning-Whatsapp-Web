import { createSlice } from '@reduxjs/toolkit';
import { ContactMe } from '@/interface/contact/contact.me.interface';

type SliceType = {
  items: ContactMe[];
  loading: boolean;
  error?: string;
};

const initialState: SliceType = {
  items: [],
  loading: true,
  error: undefined,
};

const contactSlice = createSlice({
  initialState,
  name: 'contact',
  reducers: {
    initializeMyContact: (state, action) => {
      const data: ContactMe[] = action.payload;
      state.items = [...data];
    },
    setLoadingMyContact: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMyContact: (state, action) => {
      state.error = action.payload as string;
    },
  },
});

export const { initializeMyContact, setLoadingMyContact, setErrorMyContact } = contactSlice.actions;

export default contactSlice.reducer;
