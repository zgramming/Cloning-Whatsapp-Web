import { AuthContext } from '@/context/AuthContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { ActionIcon, Avatar, Badge, TextInput } from '@mantine/core';
import {
  IconAlignCenter,
  IconArchive,
  IconDotsVertical,
  IconHistoryToggle,
  IconMessage,
  IconMicrophone,
  IconMoodHappy,
  IconPaperclip,
  IconSearch,
  IconSend,
  IconUsersGroup,
} from '@tabler/icons-react';

import Head from 'next/head';
import { useContext, useState } from 'react';

interface MessageInterface {
  id: number | string;
  type: 'text' | 'image' | 'file';
  text: string;
  sender_name: string;
  from: number | string;
  to: number | string;
  date: Date;
}

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

type ChatListItemType = {
  index: number;
};

const NavHeader = () => {
  return <div className="h-32 bg-primary-teal w-full"></div>;
};

const ChatListHeader = () => {
  return (
    <div className="h-16 bg-gray-100 px-5 py-3">
      <div className="flex flex-row items-center h-full">
        <Avatar radius="xl" />
        <div className="grow flex flex-wrap justify-end gap-5">
          <ActionIcon>
            <IconUsersGroup />
          </ActionIcon>
          <ActionIcon>
            <IconHistoryToggle />
          </ActionIcon>
          <ActionIcon>
            <IconMessage />
          </ActionIcon>
          <ActionIcon>
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

const ChatListSearch = () => {
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
};

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

const ChatListItemAvatar = () => {
  return <Avatar radius="xl" />;
};

const ChatListItemMessage = () => {
  return (
    <div className="grow flex flex-col gap-2">
      <div className="text-base">Zeffry Reynando</div>
      <div className="text-xs text-gray-500">Content</div>
    </div>
  );
};

const ChatListItemAction = () => {
  const time = new Date().toLocaleTimeString('id-ID', {
    timeStyle: 'short',
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-primary-tealdark">{time}</div>
    </div>
  );
};

const ChatListItem = ({ index }: ChatListItemType) => {
  const { id, setId } = useContext(SelectedChatListContext);

  return (
    <div
      className={`
      flex flex-row items-center gap-3 px-3 py-5
      ${id === index && 'bg-green-50'} 
    hover:bg-gray-100 hover:cursor-pointer
`}
      onClick={() => setId(index)}
    >
      <ChatListItemAvatar />
      <ChatListItemMessage />
      <ChatListItemAction />
    </div>
  );
};

const ChatList = () => {
  return (
    <div className="basis-[30%] flex flex-col">
      <ChatListHeader />
      <ChatListSearch />
      <div className="overflow-auto flex flex-col">
        <ChatListArchiveAction />
        {Array.from({ length: 50 }).map((_, index) => {
          return <ChatListItem key={index} index={index + 1} />;
        })}
      </div>
    </div>
  );
};

const ChatMessageHeader = () => {
  return (
    <div className="h-16 flex flex-row items-center bg-gray-100 gap-3 px-5 py-3">
      <Avatar radius="xl" />
      <div className="flex flex-col gap-1">
        <div className="text-sm">Zeffry Reynando</div>
        <div className="text-xs text-gray-500">Online</div>
      </div>

      <div className="grow flex flex-wrap justify-end gap-5">
        <ActionIcon>
          <IconSearch />
        </ActionIcon>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </div>
    </div>
  );
};

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

const ChatMessage = () => {
  const { id } = useContext(SelectedChatListContext);
  const { user } = useContext(AuthContext);
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
        {messages.map((message) => {
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
        })}
      </div>
      <ChatMessageInput />
    </div>
  );
};

const ChatContainer = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-lg rounded-lg my-5 mx-40">
      <div className="flex flex-row h-full">
        <ChatList />
        <ChatMessage />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloning Whatsapp</title>
        <meta name="description" content="Clong whatsapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`
        relative min-h-screen w-screen
      `}
      >
        <NavHeader />
        <ChatContainer />
      </div>
    </>
  );
}
