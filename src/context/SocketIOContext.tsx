import { createContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import {
  BASE_URL_API,
  EMIT_EVENT_CONNECT,
  EMIT_EVENT_CUSTOM_DISCONNECT,
  EMIT_EVENT_INVITE_NEW_GROUP,
  EMIT_EVENT_SEND_MESSAGE,
  EMIT_EVENT_TYPING,
} from '@/utils/constant';

export type EmitEventTypingType = {
  name: string;
  group_id: string;
  is_typing: boolean;
};

export type EmitEventInviteNewGroupType = {
  group_id: string;
  invited_by: string;
};

type ContextType = {
  socket: Socket | undefined;
  connect: (userId: string) => void;
  typing: (data: EmitEventTypingType) => void;
  sendMessage: (data: MessageCreateResponseInterface) => void;
  inviteNewGroup: (data: EmitEventInviteNewGroupType) => void;
  listenTyping: (callback: (data: EmitEventTypingType) => void) => void;
  listenSendMessage: (callback: (data: MessageCreateResponseInterface) => void) => void;
  listenInviteNewGroup: (callback: (data: EmitEventInviteNewGroupType) => void) => void;
  disconnect: (userId: string) => void;
};

const defaultValue: ContextType = {
  socket: undefined,
  connect() {},
  typing() {},
  sendMessage() {},
  inviteNewGroup() {},
  listenTyping() {},
  listenSendMessage() {},
  listenInviteNewGroup() {},
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
      inviteNewGroup(data) {
        if (socket) {
          socket.emit(EMIT_EVENT_INVITE_NEW_GROUP, data);
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
      listenInviteNewGroup(callback) {
        if (socket && !alreadyConnect) {
          socket.on(EMIT_EVENT_INVITE_NEW_GROUP, callback);
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
