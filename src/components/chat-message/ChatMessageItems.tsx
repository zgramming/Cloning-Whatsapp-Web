import { useContext } from 'react';

import { ApplicationConfigContext } from '@/context/ApplicationConfigContext';
import { ConversationDetailMessage } from '@/interface/group/conversation.detail.interface';

import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems({ messages }: { messages: ConversationDetailMessage[] }) {
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
