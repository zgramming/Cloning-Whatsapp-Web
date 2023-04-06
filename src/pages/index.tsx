import Head from 'next/head';
import { useContext, useEffect } from 'react';

import ChatContainer from '@/components/ChatContainer';
import NavHeader from '@/components/NavHeader';
import { AuthContext } from '@/context/AuthContext';
import { EmitEventTypingType, SocketIOContext } from '@/context/SocketIOContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import { addMessageToGroupDetail, updateLastMessageGroup } from '@/redux-toolkit/feature/group/group.slice';
import { resetMessageTyping, updateMessageTyping } from '@/redux-toolkit/feature/message/message.slice';
import { EMIT_EVENT_SEND_MESSAGE, EMIT_EVENT_TYPING } from '@/utils/constant';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { connect, socket, disconnect } = useContext(SocketIOContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socket && user) {
      connect(user.id);

      socket.on(EMIT_EVENT_SEND_MESSAGE, (data: MessageCreateResponseInterface) => {
        // const { data: dataResponse } = data;
        // const { from, type, message, group_id: groupId } = dataResponse;
        // console.log(`Message from ${from} to ${groupId} with type ${type} and message ${message}`);

        dispatch(updateLastMessageGroup(data));
        dispatch(addMessageToGroupDetail(data));
      });

      socket.on(EMIT_EVENT_TYPING, (data: EmitEventTypingType) => {
        const { name, group_id: groupId, is_typing: isTyping } = data;

        // console.log(`Typing from ${name} to ${groupId} with isTyping ${isTyping}`);

        if (isTyping) {
          dispatch(
            updateMessageTyping({
              name,
              group_id: groupId,
              is_typing: isTyping,
            }),
          );
        } else {
          dispatch(resetMessageTyping());
        }
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connect, disconnect, dispatch, socket, user]);

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
