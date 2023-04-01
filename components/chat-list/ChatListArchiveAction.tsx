import { Badge } from '@mantine/core';
import { IconArchive } from '@tabler/icons-react';

const ChatListArchiveAction = () => {
  return (
    <div
      className={`
        flex flex-row items-center gap-5 px-5 py-3
        hover:cursor-pointer
  `}
    >
      <IconArchive className="text-primary-teal" />
      <div className="grow">Arsip</div>
      <Badge>0</Badge>
    </div>
  );
};

export default ChatListArchiveAction;
