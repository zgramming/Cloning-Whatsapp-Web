import { useContext } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';

import ChatListItemAction from './ChatListItemAction';
import ChatListItemAvatar from './ChatListItemAvatar';
import ChatListItemMessage from './ChatListItemMessage';

type ChatListItemType = {
  index: number;
};

const ChatListItem = ({ index }: ChatListItemType) => {
  const { id, setId } = useContext(SelectedChatListContext);

  return (
    <div
      className={`
        flex flex-row items-center gap-3 px-3 py-5
        ${id === index && 'bg-green-50'} 
      hover:bg-gray-100 hover:cursor-pointer
  `}
      onClick={() => setId(index)}
    >
      <ChatListItemAvatar />
      <ChatListItemMessage />
      <ChatListItemAction />
    </div>
  );
};

export default ChatListItem;
