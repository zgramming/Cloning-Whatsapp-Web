import Head from 'next/head';
import { useContext, useEffect } from 'react';

import ChatContainer from '@/components/ChatContainer';
import NavHeader from '@/components/NavHeader';
import { AuthContext } from '@/context/AuthContext';
import { SocketIOContext } from '@/context/SocketIOContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import { addMessageToGroupDetail, updateLastMessageGroup } from '@/redux-toolkit/feature/group/group.slice';
import { EMIT_EVENT_SEND_MESSAGE } from '@/utils/constant';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { connect, socket } = useContext(SocketIOContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      connect(user.id);

      if (socket) {
        socket.on(EMIT_EVENT_SEND_MESSAGE, (data: MessageCreateResponseInterface) => {
          dispatch(updateLastMessageGroup(data));
          dispatch(addMessageToGroupDetail(data));
        });
      }
    }

    return () => {};
  }, [connect, dispatch, socket, user]);

  return (
    <>
      <Head>
        <title>Cloning Whatsapp Web</title>
        <meta name="description" content="Cloning Whatsapp Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen w-screen">
        <NavHeader />
        <ChatContainer />
      </div>
    </>
  );
}
