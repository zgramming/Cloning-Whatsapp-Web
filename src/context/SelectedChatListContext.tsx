import { createContext, useMemo, useState } from 'react';

type ContextType = {
  id: string | undefined;
  setId: (val: string | undefined) => void;
};

const defaultValue: ContextType = {
  id: undefined,
  setId: () => {},
};

export const SelectedChatListContext = createContext(defaultValue);

function SelectedChatListProvider({ children }: any) {
  const [id, setId] = useState<string | undefined>(undefined);

  const onIdHandler = (val: string | undefined) => {
    setId(val);
  };

  const value = useMemo(() => ({ id, setId: onIdHandler }), [id]);

  return <SelectedChatListContext.Provider value={value}>{children}</SelectedChatListContext.Provider>;
}
export default SelectedChatListProvider;
