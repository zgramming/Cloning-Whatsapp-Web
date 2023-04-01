import ChatList from './chat-list/ChatList';
import ChatMessage from './chat-message/ChatMessage';

const ChatContainer = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-lg rounded-lg my-5 mx-40">
      <div className="flex flex-row h-full">
        <ChatList />
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
