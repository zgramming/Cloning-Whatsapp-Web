import { useContext } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { MyGroup } from '@/interface/group/group.me.interface';
import {
  BASE_URL_GROUP_PROFILE_IMAGE_API, BASE_URL_USER_PROFILE_IMAGE_API, PATH_DEFAULT_ASSET_IMAGE,
} from '@/utils/constant';

import ChatListItemAction from './ChatListItemAction';
import ChatListItemAvatar from './ChatListItemAvatar';
import ChatListItemMessage from './ChatListItemMessage';

type OnRightClickType = {
  group: MyGroup;
  points: {
    x: number;
    y: number;
  };
};

type ChatListItemType = {
  group: MyGroup;
  onRightClick: (param: OnRightClickType) => void;
};

function ChatListItem({ group, onRightClick }: ChatListItemType) {
  const { id, setId } = useContext(SelectedChatListContext);

  const isGroup = group.type === 'GROUP';

  const srcAvatar = () => {
    if (isGroup) {
      return group.avatar ? `${BASE_URL_GROUP_PROFILE_IMAGE_API}/${group.avatar}` : PATH_DEFAULT_ASSET_IMAGE;
    }

    return group.interlocutors?.avatar
      ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${group.interlocutors?.avatar}`
      : PATH_DEFAULT_ASSET_IMAGE;
  };

  return (
    <div
      id={`chat-list-item-${group.id}`}
      role="presentation"
      className={`
        flex flex-row items-center px-3 py-5
        ${id === group.id && 'bg-green-50'} 
      hover:bg-gray-100 hover:cursor-pointer
      `}
      onClick={() => {
        setId(group.id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick({
          group,
          points: { x: e.clientX, y: e.clientY },
        });
      }}
    >
      <ChatListItemAvatar avatar={srcAvatar()} />
      <ChatListItemMessage group={group} />
      <ChatListItemAction />
    </div>
  );
}

export default ChatListItem;
