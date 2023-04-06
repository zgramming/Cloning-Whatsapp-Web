import { GroupDetailMessage } from '@/interface/group/group.detail.interface';
import ChatMessageItem from './ChatMessageItem';

function ChatMessageItems({ messages }: { messages: GroupDetailMessage[] }) {
  return (
    <div id="bottom-chat-message" className="flex flex-col justify-end gap-5 p-5">
      {messages.map((message, index) => (
        <ChatMessageItem key={`${message.id}_${index + 1}`} message={message} />
      ))}
    </div>
  );
}

export default ChatMessageItems;
