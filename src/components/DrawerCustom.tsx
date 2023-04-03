import { useContext } from 'react';

import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { Transition } from '@mantine/core';

const DrawerCustom = () => {
  const { latestNode } = useContext(DrawerNavigationStackContext);
  const isOpen = latestNode !== undefined;
  return (
    <Transition mounted={isOpen} transition={'scale-x'} duration={500}>
      {(styles) => {
        return (
          <div
            className={`
            absolute top-0 left-0 right-0 
            h-full z-10 bg-white shadow-lg
        `}
            style={styles}
          >
            {latestNode}
          </div>
        );
      }}
    </Transition>
  );
};

export default DrawerCustom;
