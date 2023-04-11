import { useContext } from 'react';

import { ApplicationConfigContext } from '@/context/ApplicationConfigContext';
import { GroupDetailMessage } from '@/interface/group/group.detail.interface';

import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems({ messages }: { messages: GroupDetailMessage[] }) {
  const { chatWallpaperColor } = useContext(ApplicationConfigContext);

  return (
    <div
      id="bottom-chat-message"
      className="flex flex-col justify-end gap-5 p-5 h-full"
      style={{
        backgroundColor: chatWallpaperColor,
      }}
    >
      {messages.map((message, index) => (
        <ChatMessageItem key={`${message.id}_${index + 1}`} message={message} />
      ))}
    </div>
  );
}

export default ChatMessageItems;
