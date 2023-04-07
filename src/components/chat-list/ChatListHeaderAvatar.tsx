import { useContext } from 'react';

import { Avatar } from '@mantine/core';
import { AuthContext } from '@/context/AuthContext';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { BASE_URL_USER_PROFILE_IMAGE_API, PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';

import DrawerProfile from '../drawer/drawer-profile/DrawerProfile';

function ChatListHeaderAvatar() {
  const { user } = useContext(AuthContext);
  const { push } = useContext(DrawerNavigationStackContext);

  const userProfileImage = user?.avatar
    ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${user?.avatar}`
    : PATH_DEFAULT_ASSET_IMAGE;

  return (
    <Avatar
      radius="xl"
      size="md"
      src={userProfileImage}
      className="hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        push(<DrawerProfile />);
      }}
    />
  );
}

export default ChatListHeaderAvatar;
