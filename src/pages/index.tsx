import Head from 'next/head';
import { useContext, useEffect } from 'react';

import ChatContainer from '@/components/ChatContainer';
import NavHeader from '@/components/NavHeader';
import { AuthContext } from '@/context/AuthContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { EmitEventTypingType, SocketIOContext } from '@/context/SocketIOContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { MessageCreateResponseInterface } from '@/interface/message/message.create-response.interface';
import { addMessageToGroupDetail, updateLastMessageGroup } from '@/redux-toolkit/feature/group/group.slice';
import { resetMessageTyping, updateMessageTyping } from '@/redux-toolkit/feature/message/message.slice';
import { scrollToBottomMessageChat } from '@/utils/function';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { connect, disconnect, listenTyping, listenSendMessage } = useContext(SocketIOContext);
  const { id: selectedChatGroupId } = useContext(SelectedChatListContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      connect(user.id);

      listenTyping((data: EmitEventTypingType) => {
        const { name, group_id: groupId, is_typing: isTyping } = data;

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

      listenSendMessage((data: MessageCreateResponseInterface) => {
        dispatch(updateLastMessageGroup(data));
        dispatch(addMessageToGroupDetail(data));

        if (selectedChatGroupId) {
          scrollToBottomMessageChat();
        }
      });
    }

    return () => {
      if (user) {
        disconnect(user.id);
      }
    };
  }, [connect, disconnect, dispatch, listenSendMessage, listenTyping, selectedChatGroupId, user]);

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
