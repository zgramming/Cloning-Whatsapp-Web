import { Card, List, Transition } from '@mantine/core';
import { IconArchive, IconPinned, IconTrash } from '@tabler/icons-react';

import ContextMenuItem from '../ContextMenuItem';

type ChatListItemContextMenuType = {
  isOpen: boolean;
  points: {
    x: number;
    y: number;
  };
};

function ChatListItemContextMenu({ isOpen, points }: ChatListItemContextMenuType) {
  const { x, y } = points;

  return (
    <Transition mounted={isOpen} transition="scale" duration={500} timingFunction="ease">
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
              <ContextMenuItem
                icon={<IconPinned size="1rem" />}
                text="Pin"
                color="green"
                onClick={() => {
                  // TODO: Pin Chat
                }}
              />
              <ContextMenuItem
                icon={<IconTrash size="1rem" />}
                text="Hapus Chat"
                color="red"
                onClick={() => {
                  // TODO: Delete Chat
                }}
              />
              <ContextMenuItem
                icon={<IconArchive size="1rem" />}
                text="Arsipkan Chat"
                color="blue"
                onClick={() => {
                  // TODO: Archive Chat
                }}
              />
            </List>
          </Card>
        </div>
      )}
    </Transition>
  );
}

export default ChatListItemContextMenu;
