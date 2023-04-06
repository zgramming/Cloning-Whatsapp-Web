import { ChangeEvent, useContext, useState } from 'react';

import { ActionIcon, TextInput, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconMicrophone, IconMoodHappy, IconPaperclip, IconSend } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { SocketIOContext } from '@/context/SocketIOContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/group.thunk';
import { asyncSendMessage } from '@/redux-toolkit/feature/message/message.thunk';
import { errorHandler } from '@/utils/error-handler';

function ChatMessageInput() {
  const [timeoutFN, setTimeoutFN] = useState<NodeJS.Timeout | undefined>();
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const { id: groupId } = useContext(SelectedChatListContext);
  const { typing: emitTyping, sendMessage: emitSendMessage } = useContext(SocketIOContext);

  const messages = useAppSelector((state) => state.group.detail.data?.messages ?? []);

  const dispatch = useAppDispatch();

  const onTypingHandler = () => {
    const clearTyping = () => {
      emitTyping({ name: user?.name || '', group_id: groupId || '', is_typing: false });
      setIsTyping(false);
    };

    if (!isTyping) {
      setIsTyping(true);
      emitTyping({
        name: user?.name || '',
        group_id: groupId || '',
        is_typing: true,
      });

      setTimeoutFN(setTimeout(clearTyping, 3000));
    } else {
      clearTimeout(timeoutFN);
      setTimeoutFN(setTimeout(clearTyping, 3000));
    }
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    /// Emit typing
    onTypingHandler();
    setMessage(e.currentTarget.value);
  };

  const onSendMessageHandler = async () => {
    try {
      if (!message) return;

      const result = await dispatch(
        asyncSendMessage({ from: user?.id || '', group_id: groupId || '', message, type: 'TEXT' }),
      ).unwrap();

      /// reset message
      setMessage('');

      /// Update group list with new user when is first time chat
      if (messages.length === 0) {
        await dispatch(asyncMyGroup()).unwrap();
      }

      /// Emit message to socket io
      emitSendMessage(result);

      /// Show notification
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
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessageHandler();
    }
  };

  return (
    <div className="flex flex-row items-center bg-gray-100 gap-5 p-5">
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
        <TextInput placeholder="Tuliskan sebuah pesan" value={message} onChange={onChangeText} onKeyDown={onEnter} />
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
