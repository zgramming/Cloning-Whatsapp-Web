import { useContext, useState } from 'react';

import { ActionIcon, LoadingOverlay, TextInput, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconMicrophone, IconMoodHappy, IconPaperclip, IconSend } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/group.thunk';
import { asyncSendMessage } from '@/redux-toolkit/feature/message/message.thunk';
import { errorHandler } from '@/utils/error-handler';

function ChatMessageInput() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const { user } = useContext(AuthContext);
  const { id: groupId } = useContext(SelectedChatListContext);

  const messages = useAppSelector((state) => state.group.detail.data?.messages ?? []);

  const dispatch = useAppDispatch();

  const onSendMessageHandler = async () => {
    try {
      if (!message) return;

      setIsLoading(true);
      const result = await dispatch(
        asyncSendMessage({ from: user?.id || '', group_id: groupId || '', message, type: 'TEXT' }),
      ).unwrap();

      /// reset message
      setMessage('');

      /// Update group list with new user when is first time chat
      if (messages.length === 0) {
        await dispatch(asyncMyGroup()).unwrap();
      }

      notifications.show({
        title: 'Success',
        message: result.message,
        color: 'green',
      });
    } catch (error) {
      const result = errorHandler(error);
      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-row items-center bg-gray-100 gap-5 p-5">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <div className="flex flex-wrap gap-3">
        <ActionIcon>
          <Tooltip label="Coming soon">
            <IconMoodHappy />
          </Tooltip>
        </ActionIcon>
        <ActionIcon>
          <Tooltip label="Coming soon">
            <IconPaperclip />
          </Tooltip>
        </ActionIcon>
      </div>
      <div className="grow">
        <TextInput placeholder="Tuliskan sebuah pesan" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-3">
        <ActionIcon>
          {message ? (
            <IconSend onClick={onSendMessageHandler} />
          ) : (
            <Tooltip label="Coming Soon">
              <IconMicrophone />
            </Tooltip>
          )}
        </ActionIcon>
      </div>
    </div>
  );
}

export default ChatMessageInput;
