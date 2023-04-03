import { createContext, useState } from 'react';

type ContextType = {
  id: string | number | undefined;
  setId: (val: string | number | undefined) => void;
};

const defaultValue: ContextType = {
  id: undefined,
  setId: (val) => {},
};

export const SelectedChatListContext = createContext(defaultValue);

const SelectedChatListProvider = ({ children }: any) => {
  const [id, setId] = useState<string | number | undefined>(undefined);

  const onIdHandler = (val: string | number | undefined) => {
    setId(val);
  };

  return (
    <SelectedChatListContext.Provider value={{ id, setId: onIdHandler }}>{children}</SelectedChatListContext.Provider>
  );
};

export default SelectedChatListProvider;
