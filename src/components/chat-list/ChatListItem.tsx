import { useContext } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';

import { MyGroup } from '@/interface/group/my-group.response.interface';
import ChatListItemAction from './ChatListItemAction';
import ChatListItemAvatar from './ChatListItemAvatar';
import ChatListItemMessage from './ChatListItemMessage';

type ChatListItemType = {
  group: MyGroup;
};

function ChatListItem({ group }: ChatListItemType) {
  const { id, setId } = useContext(SelectedChatListContext);
  const isGroup = group.type === 'GROUP';
  const participant = group.group_member[0];
  return (
    <div
      role="presentation"
      className={`
        flex flex-row items-center gap-3 px-3 py-5
        ${id === group.id && 'bg-green-50'} 
      hover:bg-gray-100 hover:cursor-pointer
      `}
      onClick={() => {
        setId(group.id);
      }}
    >
      <ChatListItemAvatar avatar={isGroup ? group.avatar : participant.user.avatar} />
      <ChatListItemMessage group={group} />
      <ChatListItemAction />
    </div>
  );
}

export default ChatListItem;
