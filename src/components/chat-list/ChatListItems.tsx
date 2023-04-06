import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/group.thunk';

import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import ChatListItem from './ChatListItem';
import ChatListItemContextMenu from './ChatListItemContextMenu';

function ChatListItems() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(asyncMyGroup());
    return () => {};
  }, [dispatch]);

  // Effect for close context menu
  useEffect(() => {
    const closeContextMenu = () => {
      setShowContextMenu(false);
    };

    window.addEventListener('click', closeContextMenu);
    return () => {
      window.removeEventListener('click', closeContextMenu);
    };
  }, []);

  if (loading) return <ChatListSkeleton />;

  if (error) return <div>{error}</div>;

  return (
    <>
      {items.map((group) => (
        <ChatListItem
          key={group.id}
          group={group}
          onRightClick={(param) => {
            const { points: pointContext } = param;
            setShowContextMenu(true);
            setPoints(pointContext);
          }}
        />
      ))}

      <ChatListItemContextMenu isOpen={showContextMenu} points={points} />
    </>
  );
}

export default ChatListItems;
