import { useContext } from 'react';

import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { Transition } from '@mantine/core';

const DrawerCustom = () => {
  const { latestNode } = useContext(DrawerNavigationStackContext);
  const isOpen = latestNode !== undefined;
  return (
    <Transition mounted={isOpen} transition={'scale-x'} duration={400}>
      {(styles) => {
        return (
          <div
            className={`
            absolute 
            ${isOpen ? 'block' : 'hidden '}
            w-full h-full z-10 bg-white shadow-lg
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
