import { ActionIcon, Avatar } from '@mantine/core';
import { IconDotsVertical, IconSearch } from '@tabler/icons-react';

const ChatMessageHeader = () => {
  return (
    <div className="h-16 flex flex-row items-center bg-gray-100 gap-3 px-5 py-3">
      <Avatar radius="xl" />
      <div className="flex flex-col gap-1">
        <div className="text-sm">Zeffry Reynando</div>
        <div className="text-xs text-gray-500">Online</div>
      </div>

      <div className="grow flex flex-wrap justify-end gap-5">
        <ActionIcon>
          <IconSearch />
        </ActionIcon>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </div>
    </div>
  );
};

export default ChatMessageHeader;
