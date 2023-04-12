import { useEffect, useState } from 'react';

import { Card, List, Transition } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArchive, IconPinned, IconUser } from '@tabler/icons-react';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import useMyGroupSelector from '@/hooks/use-my-group-selector';
import { asyncCreateContact } from '@/redux-toolkit/feature/contact/contact.thunk';
import { errorHandler } from '@/utils/error-handler';

import ContextMenuItem from '../ContextMenuItem';
import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import ChatListItem from './ChatListItem';
import { MyConversation } from '@/interface/group/conversation.me.interface';

function ChatListItems() {
  const [rightClickedConversation, setRightClickedConversation] = useState<MyConversation | undefined>();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const { x, y } = points;
  const isGroup = rightClickedConversation?.type === 'GROUP';
  const notYetInContact = rightClickedConversation?.interlocutors?.already_on_contact === false && !isGroup;

  const dispatch = useAppDispatch();

  const { error, items, loading } = useMyGroupSelector();

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
      {items.map((conversation) => (
        <ChatListItem
          key={conversation.id}
          conversation={conversation}
          onRightClick={({ conversation: conversationContext, points: pointContext }) => {
            // Set right clicked group
            setRightClickedConversation(conversationContext);

            // Show context menu
            setShowContextMenu(true);

            // Set context menu position
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
                            conversationId: rightClickedConversation?.id || '',
                            userId: rightClickedConversation?.interlocutors?.id || '',
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
                <ContextMenuItem
                  icon={<IconPinned size="1rem" />}
                  text="Pin"
                  color="green"
                  onClick={() => {
                    // TODO: Pin group
                    notifications.show({
                      title: 'Info',
                      message: 'Fitur ini belum tersedia',
                    });
                  }}
                />
                <ContextMenuItem
                  icon={<IconArchive size="1rem" />}
                  text="Arsipkan Chat"
                  color="blue"
                  onClick={() => {
                    // TODO: Archive group
                    notifications.show({
                      title: 'Info',
                      message: 'Fitur ini belum tersedia',
                    });
                  }}
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
