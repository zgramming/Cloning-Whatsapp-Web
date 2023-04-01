import { ActionIcon, Avatar } from '@mantine/core';
import { IconDotsVertical, IconHistoryToggle, IconMessage, IconUsersGroup } from '@tabler/icons-react';

const ChatListHeader = () => {
  return (
    <div className="h-16 bg-gray-100 px-5 py-3">
      <div className="flex flex-row items-center h-full">
        <Avatar radius="xl" />
        <div className="grow flex flex-wrap justify-end gap-5">
          <ActionIcon>
            <IconUsersGroup />
          </ActionIcon>
          <ActionIcon>
            <IconHistoryToggle />
          </ActionIcon>
          <ActionIcon>
            <IconMessage />
          </ActionIcon>
          <ActionIcon>
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default ChatListHeader;
