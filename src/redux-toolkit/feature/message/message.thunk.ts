import { createAsyncThunk } from '@reduxjs/toolkit';
import { MessageCreateDTO } from '@/interface/message/dto/message.create.dto';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

import { addMessageToGroupDetail, updateLastMessageGroup } from '../group/conversation.slice';
import { asyncMyGroup } from '../group/conversation.thunk';

// eslint-disable-next-line import/prefer-default-export
export const asyncSendMessage = createAsyncThunk(
  'message/asyncSendMessage',
  async ({ from, conversation_id, message, type, is_new_chat }: MessageCreateDTO, { dispatch, rejectWithValue }) => {
    try {
      const result = await API.sendMessage({
        from,
        conversation_id,
        message,
        type,
        is_new_chat,
      });

      // if new chat, re-fetch my group list to update new group
      if (is_new_chat) {
        dispatch(asyncMyGroup());
      }

      // update last message in group list and push message to group detail
      dispatch(updateLastMessageGroup(result));
      dispatch(addMessageToGroupDetail(result));
      return result;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err.message);
    }
  },
);
