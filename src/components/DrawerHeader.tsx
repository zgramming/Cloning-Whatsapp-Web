import { useContext } from 'react';

import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

const DrawerHeader = ({ title }: { title: string }) => {
  const { pop } = useContext(DrawerNavigationStackContext);
  return (
    <div className="flex flex-col justify-end h-28 p-5 bg-primary-tealdark text-white">
      <div className="flex flex-row items-center gap-5">
        <ActionIcon onClick={(e) => pop()}>
          <IconArrowLeft color="white" />
        </ActionIcon>
        <div className="font-bold text-lg">{title}</div>
      </div>
    </div>
  );
};

export default DrawerHeader;
