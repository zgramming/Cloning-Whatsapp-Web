import { configureStore } from '@reduxjs/toolkit';

import contactSlice from './feature/contact/contact.slice';
import groupSlice from './feature/group/conversation.slice';
import messageSlice from './feature/message/message.slice';
import userFilteredPhoneSlice from './feature/user/user-filtered-phone.slice';

export const store = configureStore({
  reducer: {
    group: groupSlice,
    message: messageSlice,
    contact: contactSlice,
    userFilteredPhone: userFilteredPhoneSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
