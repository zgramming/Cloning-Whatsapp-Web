import { createContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import {
  BASE_URL_API,
  EMIT_EVENT_CONNECT,
  EMIT_EVENT_CUSTOM_DISCONNECT,
  EMIT_EVENT_INVITE_NEW_CONVERSATION,
  EMIT_EVENT_SEND_MESSAGE,
  EMIT_EVENT_TYPING,
} from '@/utils/constant';

export type EmitEventTypingType = {
  name: string;
  conversation_id: string;
  is_typing: boolean;
};

export type EmitEventInviteNewConversationType = {
  conversation_id: string;
  invited_by: string;
};

type ContextType = {
  socket: Socket | undefined;
  connect: (userId: string) => void;
  typing: (data: EmitEventTypingType) => void;
  sendMessage: (data: MessageCreateResponseInterface) => void;
  inviteNewConversation: (data: EmitEventInviteNewConversationType) => void;
  listenTyping: (callback: (data: EmitEventTypingType) => void) => void;
  listenSendMessage: (callback: (data: MessageCreateResponseInterface) => void) => void;
  listenInviteNewConversation: (callback: (data: EmitEventInviteNewConversationType) => void) => void;
  disconnect: (userId: string) => void;
};

const defaultValue: ContextType = {
  socket: undefined,
  connect() {},
  typing() {},
  sendMessage() {},
  inviteNewConversation() {},
  listenTyping() {},
  listenSendMessage() {},
  listenInviteNewConversation() {},
  disconnect() {},
};

export const SocketIOContext = createContext(defaultValue);

function SocketIOProvider({ children }: any) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [alreadyConnect, setAlreadyConnect] = useState<boolean>(false);

  useEffect(() => {
    const config = io(BASE_URL_API || '', {
      autoConnect: false,
    });

    setSocket(config);

    return () => {
      config.disconnect();
    };
  }, []);

  const value: ContextType = useMemo(
    () => ({
      socket,
      connect(userId) {
        if (socket) {
          socket.connect();
          socket.emit(EMIT_EVENT_CONNECT, userId);
          setAlreadyConnect(true);
        }
      },
      typing(data) {
        if (socket) {
          socket.emit(EMIT_EVENT_TYPING, data);
        }
      },
      sendMessage(data) {
        if (socket) {
          socket.emit(EMIT_EVENT_SEND_MESSAGE, data);
        }
      },
      inviteNewConversation(data) {
        if (socket) {
          socket.emit(EMIT_EVENT_INVITE_NEW_CONVERSATION, data);
        }
      },
      listenTyping(callback: (data: EmitEventTypingType) => void) {
        if (socket && !alreadyConnect) {
          socket.on(EMIT_EVENT_TYPING, callback);
        }
      },
      listenSendMessage(callback) {
        if (socket && !alreadyConnect) {
          socket.on(EMIT_EVENT_SEND_MESSAGE, callback);
        }
      },
      listenInviteNewConversation(callback) {
        if (socket && !alreadyConnect) {
          socket.on(EMIT_EVENT_INVITE_NEW_CONVERSATION, callback);
        }
      },
      disconnect(userId) {
        if (socket) {
          socket.emit(EMIT_EVENT_CUSTOM_DISCONNECT, userId);
          socket.disconnect();
        }
      },
    }),
    [alreadyConnect, socket],
  );

  return <SocketIOContext.Provider value={value}>{children}</SocketIOContext.Provider>;
}

export default SocketIOProvider;
