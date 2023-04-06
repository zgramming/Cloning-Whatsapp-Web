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
  sendMessage: (data: MessageCreateResponseInterface) => void;
};

const defaultValue: ContextType = {
  socket: undefined,
  connect: () => {},
  disconnect: () => {},
  typing: () => {},
  sendMessage: () => {},
};

export const SocketIOContext = createContext(defaultValue);

function SocketIOProvider({ children }: any) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const config = io(BASE_URL_API || '', {
      autoConnect: false,
    });

    setSocket(config);

    return () => {
      config.close();
    };
  }, []);

  const value: ContextType = useMemo(
    () => ({
      socket,
      connect(userId) {
        if (socket) {
          socket.connect();
          socket.emit(EMIT_EVENT_CONNECT, userId);
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
      disconnect(userId) {
        if (socket) {
          socket.emit(EMIT_EVENT_CUSTOM_DISCONNECT, userId);
          socket.disconnect();
        }
      },
    }),
    [socket],
  );

  return <SocketIOContext.Provider value={value}>{children}</SocketIOContext.Provider>;
}

export default SocketIOProvider;
