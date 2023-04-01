import { useContext } from 'react';

import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { MessageInterface } from '@/interface/MessageInterface';

import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageItem from './ChatMessageItem';

const messages: MessageInterface[] = [
  {
    id: 1,
    type: 'text',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ad perspiciatis voluptatem adipisci deleniti.',
    sender_name:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ad perspiciatis voluptatem adipisci deleniti.',
    from: 2,
    to: 1,
    date: new Date(),
  },
  {
    id: 2,
    type: 'text',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ad perspiciatis voluptatem adipisci deleniti.',
    sender_name: 'Zeffry Reynando',
    from: 1,
    to: 2,
    date: new Date(),
  },
];

const ChatMessage = () => {
  const { id } = useContext(SelectedChatListContext);
  if (!id) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="text-2xl">Pilih chat untuk memulai</div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col">
      <ChatMessageHeader />
      <div className="grow flex flex-col justify-end gap-5 p-5 overflow-auto">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      </div>
      <ChatMessageInput />
    </div>
  );
};

export default ChatMessage;
