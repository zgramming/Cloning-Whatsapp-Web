import { ActionIcon, TextInput } from '@mantine/core';
import { IconAlignCenter } from '@tabler/icons-react';

function ChatListSearch() {
  return (
    <div
      className={`
        flex flex-row items-center px-5 py-3 gap-5 
        border-solid border-0 border-b-[1px] border-gray-200
        `}
    >
      <TextInput placeholder="Cari pesan" variant="filled" className="grow" />
      <ActionIcon>
        <IconAlignCenter />
      </ActionIcon>
    </div>
  );
}

export default ChatListSearch;
