import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { ConversationDetailMessage } from '@/interface/group/conversation.detail.interface';

function ChatMessageItem({ message }: { message: ConversationDetailMessage }) {
  const { user } = useContext(AuthContext);

  const { id, from, message: msg, created_at: createdAt } = message;
  const date = new Date(createdAt);
  const time = date.toLocaleTimeString('id-ID', {
    timeStyle: 'short',
  });

  const isFromMe = from === user?.id;
  return (
    <div
      key={id}
      className={`
        ${
          isFromMe
            ? 'self-end bg-primary-teal text-white'
            : 'self-start bg-white shadow-lg dark:bg-slate-700 dark:text-white'
        }
        flex flex-col gap-2 px-5 py-3 rounded-lg
      `}
    >
      <div className={`text-sm ${isFromMe && 'text-right'}`}>{msg}</div>
      <div className={`text-xs ${isFromMe && 'text-right'}`}>{time}</div>
    </div>
  );
}

export default ChatMessageItem;
