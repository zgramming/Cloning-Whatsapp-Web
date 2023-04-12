import { useContext } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import {
  BASE_URL_GROUP_PROFILE_IMAGE_API,
  BASE_URL_USER_PROFILE_IMAGE_API,
  PATH_DEFAULT_ASSET_IMAGE,
} from '@/utils/constant';

import ChatListItemAction from './ChatListItemAction';
import ChatListItemAvatar from './ChatListItemAvatar';
import ChatListItemMessage from './ChatListItemMessage';
import { MyConversation } from '@/interface/group/conversation.me.interface';

type OnRightClickType = {
  conversation: MyConversation;
  points: {
    x: number;
    y: number;
  };
};

type ChatListItemType = {
  conversation: MyConversation;
  onRightClick: (param: OnRightClickType) => void;
};

function ChatListItem({ conversation, onRightClick }: ChatListItemType) {
  const { conversationId, setConversationId } = useContext(SelectedChatListContext);

  const isGroup = conversation.type === 'GROUP';

  const srcAvatar = () => {
    if (isGroup) {
      return conversation.avatar
        ? `${BASE_URL_GROUP_PROFILE_IMAGE_API}/${conversation.avatar}`
        : PATH_DEFAULT_ASSET_IMAGE;
    }

    return conversation.interlocutors?.avatar
      ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${conversation.interlocutors?.avatar}`
      : PATH_DEFAULT_ASSET_IMAGE;
  };

  const activeColor = conversationId === conversation.id ? 'bg-green-50 dark:bg-slate-600' : '';

  return (
    <div
      id={`chat-list-item-${conversation.id}`}
      role="presentation"
      className={`
        flex flex-row items-center px-3 py-5
        ${activeColor} 
      hover:bg-gray-100 hover:cursor-pointer
        dark:hover:bg-slate-700
      `}
      onClick={() => {
        setConversationId(conversation.id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick({
          conversation,
          points: { x: e.clientX, y: e.clientY },
        });
      }}
    >
      <ChatListItemAvatar avatar={srcAvatar()} />
      <ChatListItemMessage conversation={conversation} />
      <ChatListItemAction />
    </div>
  );
}

export default ChatListItem;
