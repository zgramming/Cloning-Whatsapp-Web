import { useContext } from 'react';

import { IconCheck } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { useAppSelector } from '@/hooks/use-dispatch-selector';
import { inserCharEveryNCharacter } from '@/utils/function';
import { MyConversation } from '@/interface/group/conversation.me.interface';

function ChatListItemMessageIndicator({ conversation }: { conversation: MyConversation }) {
  const { user: userLogin } = useContext(AuthContext);

  const isGroup = conversation.type === 'GROUP';
  if (isGroup) {
    if (conversation.last_sender === userLogin?.id) {
      return (
        <>
          <IconCheck size="1rem" />
          <div>You :</div>
        </>
      );
    }
  }

  if (conversation.last_sender === userLogin?.id) {
    return <IconCheck size="1rem" />;
  }

  return null;
}

function ChatListItemMessageDescription({ last_msg, id }: MyConversation) {
  const mapTyping = useAppSelector((state) => state.message.messageTyping);
  const { conversation_id: conversationId, is_typing: isTyping, name } = mapTyping[id] || false;

  if (isTyping && conversationId === id) {
    return <div className="font-semibold text-primary-teal text-xs line-clamp-1">{`${name} sedang mengetik ...`}</div>;
  }

  return <div>{last_msg}</div>;
}

function ChatListItemMessage({ conversation }: { conversation: MyConversation }) {
  function nameUser() {
    let result = conversation.name;

    /// Condition when private chat
    if (conversation.interlocutors) {
      result = conversation.interlocutors.name;

      if (conversation.interlocutors.already_on_contact === false) {
        result = conversation.interlocutors.phone;
        result = inserCharEveryNCharacter(result, '-', 4);
      }
    }

    return result;
  }

  return (
    <div className="grow flex flex-col gap-2 px-2">
      <div className="text-base">{nameUser()}</div>
      <div className="flex flex-row items-center gap-1 text-xs text-gray-500">
        <ChatListItemMessageIndicator conversation={conversation} />
        <ChatListItemMessageDescription {...conversation} />
      </div>
    </div>
  );
}

export default ChatListItemMessage;
