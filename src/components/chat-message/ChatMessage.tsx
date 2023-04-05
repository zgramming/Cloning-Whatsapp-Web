import { useContext, useEffect } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { GroupDetailMessage } from '@/interface/group/group.detail.interface';
import { asyncGroupDetail } from '@/redux-toolkit/feature/group/group.thunk';

import ChatMessageSkeleton from '../skeleton/ChatMessageSkeleton';
import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems({ messages }: { messages: GroupDetailMessage[] }) {
  return (
    <div className="grow flex flex-col justify-end gap-5 p-5 overflow-auto">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

function ChatMessage() {
  const { id: groupId } = useContext(SelectedChatListContext);
  const { data: detailGroup, loading, error } = useAppSelector((state) => state.group.detail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGroupDetail(groupId || ''));
    return () => {};
  }, [dispatch, groupId]);

  if (!groupId) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="text-2xl">Pilih chat untuk memulai</div>
      </div>
    );
  }

  if (loading) return <ChatMessageSkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!detailGroup) return <div className="text-red-500">Group not found</div>;

  const { messages } = detailGroup;

  return (
    <div className="grow flex flex-col">
      <ChatMessageHeader groupDetail={detailGroup} />
      <ChatMessageItems messages={messages} />
      <ChatMessageInput />
    </div>
  );
}

export default ChatMessage;
