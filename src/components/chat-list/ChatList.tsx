import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/group.slice';

import DrawerCustom from '../DrawerCustom';
import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import ChatListArchiveAction from './ChatListArchiveAction';
import ChatListHeader from './ChatListHeader';
import ChatListItem from './ChatListItem';
import ChatListSearch from './ChatListSearch';

function ChatListItems() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(asyncMyGroup());
    return () => {};
  }, [dispatch]);

  if (loading) {
    return <ChatListSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {items.map((group) => (
        <ChatListItem group={group} key={group.id} />
      ))}
    </>
  );
}

function ChatList() {
  return (
    <div className="relative basis-[30%] flex flex-col shadow">
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
