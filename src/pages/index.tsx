import Head from 'next/head';
import { useContext, useEffect } from 'react';

import { notifications } from '@mantine/notifications';
import ChatContainer from '@/components/ChatContainer';
import NavHeader from '@/components/NavHeader';
import { AuthContext } from '@/context/AuthContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { SocketIOContext } from '@/context/SocketIOContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { addMessageToGroupDetail, updateLastMessageGroup } from '@/redux-toolkit/feature/group/conversation.slice';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/conversation.thunk';
import { resetMessageTyping, updateMessageTyping } from '@/redux-toolkit/feature/message/message.slice';
import { scrollToBottomMessageChat } from '@/utils/function';

export default function Home() {
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line max-len, operator-linebreak
  const { connect, disconnect, listenTyping, listenSendMessage, listenInviteNewConversation } =
    useContext(SocketIOContext);
  const { conversationId } = useContext(SelectedChatListContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      connect(user.id);

      listenTyping((data) => {
        const { name, conversation_id: conversationIdTyping, is_typing: isTyping } = data;

        if (isTyping) {
          dispatch(
            updateMessageTyping({
              name,
              conversation_id: conversationIdTyping,
              is_typing: isTyping,
            }),
          );
        } else {
          dispatch(
            resetMessageTyping({
              conversation_id: conversationIdTyping,
            }),
          );
        }
      });

      listenSendMessage((data) => {
        dispatch(updateLastMessageGroup(data));
        dispatch(addMessageToGroupDetail(data));

        if (conversationId) {
          scrollToBottomMessageChat();
        }
      });

      // Listen invite new group from other user, then re-fetch my group
      listenInviteNewConversation(({ conversation_id, invited_by }) => {
        notifications.show({
          title: 'New Group',
          message: `You have been invited to join group ${conversation_id} by ${invited_by}`,
          color: 'teal',
        });

        dispatch(asyncMyGroup());
      });
    }

    return () => {
      if (user) {
        disconnect(user.id);
      }
    };
  }, [
    user,
    conversationId,
    connect,
    disconnect,
    dispatch,
    listenSendMessage,
    listenTyping,
    listenInviteNewConversation,
  ]);

  return (
    <>
      <Head>
        <title>Cloning Whatsapp Web</title>
        <meta name="description" content="Cloning Whatsapp Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`
      relative min-h-screen w-screen
      dark:bg-slate-800
      `}
      >
        <NavHeader />
        <ChatContainer />
      </div>
    </>
  );
}
