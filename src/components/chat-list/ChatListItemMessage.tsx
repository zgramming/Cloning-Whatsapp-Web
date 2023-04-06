import { useContext } from 'react';

import { IconCheck } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { useAppSelector } from '@/hooks/use-dispatch-selector';
import { MyGroup } from '@/interface/group/group.me.interface';

function ChatListItemMessageIndicator({ group }: { group: MyGroup }) {
  const { user: userLogin } = useContext(AuthContext);

  const isGroup = group.type === 'GROUP';
  if (isGroup) {
    if (group.last_sender === userLogin?.id) {
      return (
        <>
          <IconCheck size="1rem" />
          <div>You :</div>
        </>
      );
    }
  }

  if (group.last_sender === userLogin?.id) {
    return <IconCheck size="1rem" />;
  }

  return null;
}

function ChatListItemMessageDescription({ last_msg, id }: MyGroup) {
  const { group_id: groupId, is_typing: isTyping, name } = useAppSelector((state) => state.message.messageTyping);

  if (isTyping && groupId === id) {
    return <div className="font-semibold text-primary-teal text-xs line-clamp-1">{`${name} sedang mengetik ...`}</div>;
  }

  return <div>{last_msg}</div>;
}

function ChatListItemMessage({ group }: { group: MyGroup }) {
  const isGroup = group.type === 'GROUP';
  const name = isGroup ? group.name : group.interlocutors?.name;

  return (
    <div className="grow flex flex-col gap-2 px-2">
      <div className="text-base">{name}</div>
      <div className="flex flex-row items-center gap-1 text-xs text-gray-500">
        <ChatListItemMessageIndicator group={group} />
        <ChatListItemMessageDescription {...group} />
      </div>
    </div>
  );
}

export default ChatListItemMessage;
