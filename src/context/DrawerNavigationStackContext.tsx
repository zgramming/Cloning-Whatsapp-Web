import { createContext, ReactNode, useState } from 'react';

type ContextType = {
  nodes: ReactNode[];
  latestNode?: ReactNode;
  push: (val: ReactNode) => void;
  pop: () => void;
};

const defaultValue: ContextType = {
  nodes: [],
  latestNode: undefined,
  push: (val) => {},
  pop: () => {},
};

export const DrawerNavigationStackContext = createContext(defaultValue);

const DrawerNavigationStackProvider = ({ children }: any) => {
  const [nodes, setNodes] = useState<ReactNode[]>([]);
  const [latestNode, setLatestNode] = useState<ReactNode | undefined>();

  const onPushHandler = (val: ReactNode) => {
    setNodes((prevState) => {
      setLatestNode(val);
      return [...prevState, val];
    });
  };

  const onPopHandler = () => {
    setNodes((prevState) => {
      if (prevState.length === 1) {
        setLatestNode(undefined);
        return [];
      }

      return prevState.slice(0, prevState.length - 1);
    });
  };

  return (
    <DrawerNavigationStackContext.Provider value={{ nodes, push: onPushHandler, pop: onPopHandler, latestNode }}>
      {children}
    </DrawerNavigationStackContext.Provider>
  );
};

export default DrawerNavigationStackProvider;
