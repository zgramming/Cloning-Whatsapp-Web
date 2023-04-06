import DrawerNavigationStackProvider from '@/context/DrawerNavigationStackContext';

import ChatList from './chat-list/ChatList';
import ChatMessage from './chat-message/ChatMessage';

function ChatContainer() {
  return (
    <div
      className={`
      absolute top-0 left-0 right-0 bottom-0 
      bg-white shadow-lg rounded-lg m-5 
      xl:my-5 xl:mx-40
    `}
    >
      <div className="flex flex-row h-full">
        <DrawerNavigationStackProvider>
          <ChatList />
        </DrawerNavigationStackProvider>
        <ChatMessage />
      </div>
    </div>
  );
}

export default ChatContainer;
