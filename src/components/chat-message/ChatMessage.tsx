import { useContext, useEffect } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncMessage } from '@/redux-toolkit/feature/message/message.slice';

import ChatMessageSkeleton from '../skeleton/ChatMessageSkeleton';
import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems() {
  const { id: groupId } = useContext(SelectedChatListContext);
  const { items, loading, error } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncMessage(groupId || ''));
    return () => {};
  }, [dispatch, groupId]);

  if (loading) return <ChatMessageSkeleton />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grow flex flex-col justify-end gap-5 p-5 overflow-auto">
      {items.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

function ChatMessage() {
  const { id } = useContext(SelectedChatListContext);
  if (!id) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="text-2xl">Pilih chat untuk memulai</div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col">
      <ChatMessageHeader />
      <ChatMessageItems />
      <ChatMessageInput />
    </div>
  );
}

export default ChatMessage;
