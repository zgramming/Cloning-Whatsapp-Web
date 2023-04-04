import { configureStore } from '@reduxjs/toolkit';
import { groupSlice } from './feature/group/group.slice';

import { messageSlice } from './feature/message/message.slice';
import { userFilteredPhoneSlice } from './feature/user/user-filtered-phone.slice';

export const store = configureStore({
  reducer: {
    group: groupSlice.reducer,
    message: messageSlice.reducer,
    userFilteredPhone: userFilteredPhoneSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
