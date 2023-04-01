import ChatListArchiveAction from './ChatListArchiveAction';
import ChatListHeader from './ChatListHeader';
import ChatListItem from './ChatListItem';
import ChatListSearch from './ChatListSearch';

const ChatList = () => {
  return (
    <div className="basis-[30%] flex flex-col">
      <ChatListHeader />
      <ChatListSearch />
      <div className="overflow-auto flex flex-col">
        <ChatListArchiveAction />
        {Array.from({ length: 50 }).map((_, index) => {
          return <ChatListItem key={index} index={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default ChatList;
