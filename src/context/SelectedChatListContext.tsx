import { createContext, useMemo, useState } from 'react';

type ContextType = {
  conversationId: string | undefined;
  setConversationId: (val: string | undefined) => void;
};

const defaultValue: ContextType = {
  conversationId: undefined,
  setConversationId: () => {},
};

export const SelectedChatListContext = createContext(defaultValue);

function SelectedChatListProvider({ children }: any) {
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const onConversationIdHandler = (val: string | undefined) => {
    setConversationId(val);
  };

  const value = useMemo(() => ({ conversationId, setConversationId: onConversationIdHandler }), [conversationId]);

  return <SelectedChatListContext.Provider value={value}>{children}</SelectedChatListContext.Provider>;
}
export default SelectedChatListProvider;
