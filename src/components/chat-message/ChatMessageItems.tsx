import { useContext } from 'react';

import { ApplicationConfigContext } from '@/context/ApplicationConfigContext';
import { ConversationDetailMessage } from '@/interface/group/conversation.detail.interface';

import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems({ messages }: { messages: ConversationDetailMessage[] }) {
  const { chatWallpaperColor } = useContext(ApplicationConfigContext);

  return (
    <div
      className="grow overflow-auto"
      style={{
        backgroundColor: chatWallpaperColor,
      }}
    >
      <div id="bottom-chat-message" className="flex flex-col justify-end gap-5 p-5">
        {messages.map((message, index) => (
          <ChatMessageItem key={`${message.id}_${index + 1}`} message={message} />
        ))}
      </div>
    </div>
  );
}

export default ChatMessageItems;
