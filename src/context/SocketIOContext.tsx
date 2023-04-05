import { createContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL_API, EMIT_EVENT_CONNECT, EMIT_EVENT_DISCONNECT } from '@/utils/constant';

type ContextType = {
  socket: Socket | undefined;
  connect: (userId: string) => void;
  disconnect: (userId: string) => void;
};

const defaultValue: ContextType = {
  socket: undefined,
  connect: () => {},
  disconnect: () => {},
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
      disconnect(userId) {
        if (socket) {
          socket.emit(EMIT_EVENT_DISCONNECT, userId);
          socket.disconnect();
        }
      },
    }),
    [socket],
  );

  return <SocketIOContext.Provider value={value}>{children}</SocketIOContext.Provider>;
}

export default SocketIOProvider;
