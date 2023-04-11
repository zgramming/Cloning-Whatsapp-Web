import Image from 'next/image';
import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { BASE_URL_USER_PROFILE_IMAGE_API, PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';

import DrawerProfile from '../drawer-profile/DrawerProfile';

function DrawerSettingProfilePreview() {
  const { user } = useContext(AuthContext);
  const { push } = useContext(DrawerNavigationStackContext);

  const src = user?.avatar ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${user.avatar}` : PATH_DEFAULT_ASSET_IMAGE;
  return (
    <div
      role="presentation"
      className={`
      flex flex-row items-center p-5 gap-5
      hover:bg-gray-100 hover:cursor-pointer
      dark:hover:bg-slate-700
      `}
      onClick={() => push(<DrawerProfile />)}
    >
      <div className="relative h-20 w-20 rounded-full">
        <Image alt="Image Profile" src={src} className="rounded-full" fill />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-normal">{user?.name || ''}</h3>
        {user?.bio && <p className="text-sm text-gray-500">{user.bio}</p>}
      </div>
    </div>
  );
}

export default DrawerSettingProfilePreview;
