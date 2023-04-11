import { useContext } from 'react';

import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';

function DrawerHeader({ title }: { title: string }) {
  const { pop } = useContext(DrawerNavigationStackContext);
  return (
    <div
      className={`
      flex flex-col justify-end h-28 p-5 bg-primary-tealdark text-white
      dark:bg-slate-700
      `}
    >
      <div className="flex flex-row items-center gap-5">
        <ActionIcon onClick={() => pop()}>
          <IconArrowLeft color="white" />
        </ActionIcon>
        <div className="font-bold text-lg">{title}</div>
      </div>
    </div>
  );
}

export default DrawerHeader;
