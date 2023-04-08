import { useEffect, useState } from 'react';

import { Card, List, Transition } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArchive, IconPinned, IconTrash, IconUser } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { MyGroup } from '@/interface/group/group.me.interface';
import { asyncCreateContact } from '@/redux-toolkit/feature/contact/contact.thunk';
import { asyncMyGroup } from '@/redux-toolkit/feature/group/group.thunk';
import { errorHandler } from '@/utils/error-handler';

import ContextMenuItem from '../ContextMenuItem';
import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import ChatListItem from './ChatListItem';

function ChatListItems() {
  const [rightClickedGroup, setRightClickedGroup] = useState<MyGroup | undefined>();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const { x, y } = points;
  const isGroup = rightClickedGroup?.type === 'GROUP';
  const notYetInContact = rightClickedGroup?.interlocutors?.already_on_contact === false && !isGroup;

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

    window.addEventListener('mousedown', closeContextMenu);
    return () => {
      window.removeEventListener('mousedown', closeContextMenu);
    };
  }, []);

  if (loading) return <ChatListSkeleton />;

  if (error) return <div className="flex flex-col items-center justify-center h-full">{error}</div>;

  return (
    <>
      {items.map((group) => (
        <ChatListItem
          key={group.id}
          group={group}
          onRightClick={({ group: groupContext, points: pointContext }) => {
            setRightClickedGroup(groupContext);

            setShowContextMenu(true);

            setPoints(pointContext);
          }}
        />
      ))}

      <Transition mounted={showContextMenu} transition="scale" duration={500} timingFunction="ease">
        {(styles) => (
          <div
            className="fixed"
            style={{
              ...styles,
              top: `${y}px`,
              left: `${x}px`,
            }}
          >
            <Card shadow="sm" padding={0} radius="md" className="flex flex-col" withBorder>
              <List spacing={0} size="sm" className="py-3" center>
                {notYetInContact && (
                  <ContextMenuItem
                    icon={<IconUser size="1rem" />}
                    text="Tambah ke Kontak"
                    color="cyan"
                    onClick={async () => {
                      try {
                        const result = await dispatch(
                          asyncCreateContact({
                            groupId: rightClickedGroup?.id || '',
                            userId: rightClickedGroup?.interlocutors?.id || '',
                          }),
                        ).unwrap();

                        notifications.show({
                          title: 'Success',
                          message: result.message,
                          color: 'green',
                        });
                      } catch (err) {
                        const result = errorHandler(err);
                        notifications.show({
                          title: 'Error',
                          message: result.message,
                          color: 'red',
                        });
                      }
                    }}
                  />
                )}
                <ContextMenuItem icon={<IconPinned size="1rem" />} text="Pin" color="green" onClick={() => {}} />
                <ContextMenuItem icon={<IconTrash size="1rem" />} text="Hapus Chat" color="red" onClick={() => {}} />
                <ContextMenuItem
                  icon={<IconArchive size="1rem" />}
                  text="Arsipkan Chat"
                  color="blue"
                  onClick={() => {}}
                />
              </List>
            </Card>
          </div>
        )}
      </Transition>
    </>
  );
}

export default ChatListItems;
