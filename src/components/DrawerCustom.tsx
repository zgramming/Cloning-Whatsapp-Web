import { useContext } from 'react';
import { Transition } from '@mantine/core';

import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';

function DrawerCustom() {
  const { latestNode } = useContext(DrawerNavigationStackContext);
  const isOpen = latestNode !== undefined;

  return (
    <Transition mounted={isOpen} transition="scale-x" duration={500}>
      {(styles) => (
        <div
          className={`
            absolute top-0 left-0 right-0 
            h-full z-10 bg-white shadow-lg
            dark:bg-slate-800
        `}
          style={styles}
        >
          {latestNode}
        </div>
      )}
    </Transition>
  );
}

export default DrawerCustom;
