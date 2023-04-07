import { useContext } from 'react';

import { Avatar } from '@mantine/core';
import { AuthContext } from '@/context/AuthContext';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { PATH_DEFAULT_IMAGE } from '@/utils/constant';

import DrawerProfile from '../drawer/drawer-profile/DrawerProfile';

function ChatListHeaderAvatar() {
  const { user } = useContext(AuthContext);
  const { push } = useContext(DrawerNavigationStackContext);
  return (
    <Avatar
      radius="xl"
      size="md"
      src={user?.avatar || PATH_DEFAULT_IMAGE}
      className="hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        push(<DrawerProfile />);
      }}
    />
  );
}

export default ChatListHeaderAvatar;
