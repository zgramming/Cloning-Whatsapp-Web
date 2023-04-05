import { Avatar } from '@mantine/core';

function ChatListItemAvatar({ avatar }: { avatar?: string }) {
  return <Avatar radius="xl" size="lg" src={avatar} />;
}

ChatListItemAvatar.defaultProps = {
  avatar: undefined,
};

export default ChatListItemAvatar;
