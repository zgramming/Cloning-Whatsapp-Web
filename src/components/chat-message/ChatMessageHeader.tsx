import { ActionIcon, Avatar, Tooltip } from '@mantine/core';
import { IconDotsVertical, IconSearch } from '@tabler/icons-react';
import { GroupDetail, GroupDetailInterlocutors } from '@/interface/group/group.detail.interface';

function ChatMessageHeaderGroup() {
  return (
    <>
      <Avatar radius="xl" />
      <div className="flex flex-col gap-1">
        <div className="text-sm">Zeffry Reynando</div>
        <div className="text-xs text-gray-500">Online</div>
      </div>
    </>
  );
}

function ChatMessageHeaderPrivate({ interlocutors }: { interlocutors: GroupDetailInterlocutors }) {
  return (
    <>
      <Avatar radius="xl" src={interlocutors.user.avatar} />
      <div className="flex flex-col gap-1">
        <div className="text-sm">{interlocutors.user.name}</div>
      </div>
    </>
  );
}

function ChatMessageHeader({ groupDetail }: { groupDetail: GroupDetail }) {
  const { interlocutors } = groupDetail;
  return (
    <div className="h-16 flex flex-row items-center bg-gray-100 gap-3 px-5 py-3">
      {groupDetail.type === 'GROUP' && <ChatMessageHeaderGroup />}
      {groupDetail.type === 'PRIVATE' && <ChatMessageHeaderPrivate interlocutors={interlocutors} />}
      <div className="grow flex flex-wrap justify-end gap-5">
        <ActionIcon>
          <Tooltip label="Coming Soon">
            <IconSearch />
          </Tooltip>
        </ActionIcon>
        <ActionIcon>
          <Tooltip label="Coming Soon">
            <IconDotsVertical />
          </Tooltip>
        </ActionIcon>
      </div>
    </div>
  );
}

export default ChatMessageHeader;
