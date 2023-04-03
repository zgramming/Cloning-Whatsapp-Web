import { useState } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';
import { IconMicrophone, IconMoodHappy, IconPaperclip, IconSend } from '@tabler/icons-react';

const ChatMessageInput = () => {
  const [message, setMessage] = useState<string>();
  return (
    <div className="flex flex-row items-center bg-gray-100 gap-5 p-5">
      <div className="flex flex-wrap gap-3">
        <ActionIcon>
          <IconMoodHappy />
        </ActionIcon>
        <ActionIcon>
          <IconPaperclip />
        </ActionIcon>
      </div>
      <div className="grow">
        <TextInput placeholder="Tuliskan sebuah pesan" onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-3">
        <ActionIcon>{message ? <IconSend /> : <IconMicrophone />}</ActionIcon>
      </div>
    </div>
  );
};

export default ChatMessageInput;
