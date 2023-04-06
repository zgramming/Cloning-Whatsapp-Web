import { useContext, useEffect } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncGroupDetail } from '@/redux-toolkit/feature/group/group.thunk';
import { scrollToBottomMessageChat } from '@/utils/function';

import ChatMessageSkeleton from '../skeleton/ChatMessageSkeleton';
import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageItems from './ChatMessageItems';

function ChatMessage() {
  const { id: groupId } = useContext(SelectedChatListContext);
  const { data: detailGroup, loading, error } = useAppSelector((state) => state.group.detail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (groupId) {
      dispatch(asyncGroupDetail(groupId));
    }

    return () => {};
  }, [dispatch, groupId]);

  /// Every time messages change, scroll to bottom
  useEffect(() => {
    if (detailGroup?.messages) {
      scrollToBottomMessageChat();
    }
    return () => {};
  }, [detailGroup?.messages]);

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
      <div className="grow overflow-auto">
        <ChatMessageItems messages={messages} />
      </div>
      <ChatMessageInput />
    </div>
  );
}

export default ChatMessage;
