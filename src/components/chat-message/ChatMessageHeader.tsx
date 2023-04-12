import { ActionIcon, Avatar, Tooltip } from '@mantine/core';
import { IconDotsVertical, IconSearch } from '@tabler/icons-react';
import { ConversationDetail, ConversationDetailInterlocutors } from '@/interface/group/conversation.detail.interface';
import {
  BASE_URL_GROUP_PROFILE_IMAGE_API,
  BASE_URL_USER_PROFILE_IMAGE_API,
  PATH_DEFAULT_ASSET_IMAGE,
} from '@/utils/constant';

function ChatMessageHeaderGroup({ name, avatar }: ConversationDetail) {
  const src = avatar ? `${BASE_URL_GROUP_PROFILE_IMAGE_API}/${avatar}` : PATH_DEFAULT_ASSET_IMAGE;

  return (
    <>
      <Avatar radius="xl" src={src} />
      <div className="flex flex-col gap-1">
        <div className="text-sm">{name}</div>
      </div>
    </>
  );
}

function ChatMessageHeaderPrivate({ interlocutors }: { interlocutors: ConversationDetailInterlocutors }) {
  const src = interlocutors.user.avatar
    ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${interlocutors.user.avatar}`
    : PATH_DEFAULT_ASSET_IMAGE;

  return (
    <>
      <Avatar radius="xl" src={src} />
      <div className="flex flex-col gap-1">
        <div className="text-sm">{interlocutors.user.name}</div>
      </div>
    </>
  );
}

function ChatMessageHeader({ conversation }: { conversation: ConversationDetail }) {
  const { interlocutors } = conversation;
  return (
    <div
      className={`
    h-16 flex flex-row items-center bg-gray-100 gap-3 px-5 py-3
    dark:bg-slate-700 dark:text-white
    `}
    >
      {conversation.type === 'GROUP' && <ChatMessageHeaderGroup {...conversation} />}
      {conversation.type === 'PRIVATE' && <ChatMessageHeaderPrivate interlocutors={interlocutors} />}
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
