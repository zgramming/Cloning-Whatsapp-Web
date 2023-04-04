import { Avatar } from '@mantine/core';

function ChatListItemAvatar({ avatar }: { avatar?: string }) {
  if (avatar) {
    <Avatar radius="xl" src={avatar} />;
  }

  return <Avatar radius="xl" />;
}

ChatListItemAvatar.defaultProps = {
  avatar: undefined,
};

export default ChatListItemAvatar;
