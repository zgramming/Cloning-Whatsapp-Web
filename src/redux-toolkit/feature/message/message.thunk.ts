import { createAsyncThunk } from '@reduxjs/toolkit';
import { MessageCreateDTO } from '@/interface/dto/message.create.dto';
import API from '@/utils/api';
import { errorHandler } from '@/utils/error-handler';

import { addMessageToGroupDetail, updateLastMessageGroup } from '../group/group.slice';

// eslint-disable-next-line import/prefer-default-export
export const asyncSendMessage = createAsyncThunk(
  'message/asyncSendMessage',
  async ({ from, group_id, message, type }: MessageCreateDTO, { dispatch, rejectWithValue }) => {
    try {
      const result = await API.sendMessage({
        from,
        group_id,
        message,
        type,
      });

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
