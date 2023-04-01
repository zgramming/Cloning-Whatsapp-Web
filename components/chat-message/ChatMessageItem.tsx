import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { MessageInterface } from '@/interface/MessageInterface';

const ChatMessageItem = ({ message }: { message: MessageInterface }) => {
  const { user } = useContext(AuthContext);

  const { id, type, text, sender_name, from, to, date } = message;
  const time = date.toLocaleTimeString('id-ID', {
    timeStyle: 'short',
  });

  const isFromMe = from === user?.id;
  return (
    <div
      key={id}
      className={`
        ${isFromMe ? 'self-end bg-primary-teal text-white' : 'self-start bg-white shadow-lg'}
        flex flex-col gap-2 px-5 py-3 rounded-lg
      `}
    >
      <div className={`text-sm ${isFromMe && 'text-right'}`}>{text}</div>
      <div className={`text-xs ${isFromMe && 'text-right'}`}>{time}</div>
    </div>
  );
};

export default ChatMessageItem;
