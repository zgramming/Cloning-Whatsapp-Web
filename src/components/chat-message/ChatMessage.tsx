import { useContext, useEffect } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncConversationDetail } from '@/redux-toolkit/feature/group/conversation.thunk';
import { scrollToBottomMessageChat } from '@/utils/function';

import ChatMessageSkeleton from '../skeleton/ChatMessageSkeleton';
import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageItems from './ChatMessageItems';

function ChatMessage() {
  const { conversationId } = useContext(SelectedChatListContext);
  const { data: detailGroup, loading, error } = useAppSelector((state) => state.group.detail);
  const dispatch = useAppDispatch();

  /// Fetch conversation detail
  useEffect(() => {
    if (conversationId) {
      dispatch(asyncConversationDetail(conversationId));
    }

    return () => {};
  }, [dispatch, conversationId]);

  /// Every time messages change, scroll to bottom
  useEffect(() => {
    if (detailGroup?.messages) {
      scrollToBottomMessageChat();
    }
    return () => {};
  }, [detailGroup?.messages]);

  if (!conversationId) {
    return (
      <div
        className={`
      grow flex flex-col items-center justify-center
      dark:bg-gray-800
      `}
      >
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
      <ChatMessageHeader conversation={detailGroup} />
      <ChatMessageItems messages={messages} />
      <ChatMessageInput />
    </div>
  );
}

export default ChatMessage;
