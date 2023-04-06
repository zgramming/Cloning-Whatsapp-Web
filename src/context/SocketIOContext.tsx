import { createContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import {
  BASE_URL_API,
  EMIT_EVENT_CONNECT,
  EMIT_EVENT_CUSTOM_DISCONNECT,
  EMIT_EVENT_SEND_MESSAGE,
  EMIT_EVENT_TYPING,
} from '@/utils/constant';

export type EmitEventTypingType = {
  name: string;
  group_id: string;
  is_typing: boolean;
};

type ContextType = {
  socket: Socket | undefined;
  connect: (userId: string) => void;
  disconnect: (userId: string) => void;
  typing: (data: EmitEventTypingType) => void;
  listenTyping: (callback: (data: EmitEventTypingType) => void) => void;
  listenSendMessage: (callback: (data: MessageCreateResponseInterface) => void) => void;
  sendMessage: (data: MessageCreateResponseInterface) => void;
};

const defaultValue: ContextType = {
  socket: undefined,
  connect: () => {},
  disconnect: () => {},
  typing: () => {},
  listenTyping() {},
  listenSendMessage() {},
  sendMessage: () => {},
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
