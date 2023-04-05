import { useContext } from 'react';

import { IconCheck } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { MyGroup } from '@/interface/group/group.me.interface';

function ChatListItemMessageDetail({ group }: { group: MyGroup }) {
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

function ChatListItemMessage({ group }: { group: MyGroup }) {
  const isGroup = group.type === 'GROUP';
  const name = isGroup ? group.name : group.interlocutors?.name;

  return (
    <div className="grow flex flex-col gap-2">
      <div className="text-base">{name}</div>
      <div className="flex flex-row items-center gap-1 text-xs text-gray-500">
        <ChatListItemMessageDetail group={group} />
        <div>{group.last_msg}</div>
      </div>
    </div>
  );
}

export default ChatListItemMessage;
