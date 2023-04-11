import DrawerCustom from '../DrawerCustom';
import ChatListArchiveAction from './ChatListArchiveAction';
import ChatListHeader from './ChatListHeader';
import ChatListItems from './ChatListItems';
import ChatListSearch from './ChatListSearch';

function ChatList() {
  return (
    <div
      className={`
      relative basis-[40%] flex flex-col shadow xl:basis-[30%]
      dark:bg-slate-800
      
    `}
    >
      <DrawerCustom />
      <ChatListHeader />
      <ChatListSearch />
      <div className="overflow-auto flex flex-col">
        <ChatListArchiveAction />
        <ChatListItems />
      </div>
    </div>
  );
}

export default ChatList;
