import { Card, List, MantineColor, ThemeIcon } from '@mantine/core';
import { IconArchive, IconPinned, IconTrash } from '@tabler/icons-react';

type ChatListItemContextMenuType = {
  isOpen: boolean;
  points: {
    x: number;
    y: number;
  };
};

type ChatListItemsContextMenuItemType = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  color: MantineColor;
};

function ChatListItemsContextMenuItem({ color, icon, onClick, text }: ChatListItemsContextMenuItemType) {
  return (
    <List.Item
      className="p-3 hover:bg-gray-100 hover:cursor-pointer"
      icon={
        <ThemeIcon color={color} size={24} radius="xl">
          {icon}
        </ThemeIcon>
      }
      onClick={onClick}
    >
      {text}
    </List.Item>
  );
}

function ChatListItemContextMenu({ isOpen, points }: ChatListItemContextMenuType) {
  const { x, y } = points;

  if (!isOpen) return null;

  return (
    <div
      className="fixed"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <Card shadow="sm" padding={0} radius="md" className="flex flex-col" withBorder>
        <List spacing={0} size="sm" className="py-3" center>
          <ChatListItemsContextMenuItem
            icon={<IconPinned size="1rem" />}
            text="Pin"
            color="green"
            onClick={() => {
              // TODO: Pin Chat
              alert('Coming Soon');
            }}
          />
          <ChatListItemsContextMenuItem
            icon={<IconTrash size="1rem" />}
            text="Hapus Chat"
            color="red"
            onClick={() => {
              // TODO: Delete Chat
              alert('Coming Soon');
            }}
          />
          <ChatListItemsContextMenuItem
            icon={<IconArchive size="1rem" />}
            text="Arsipkan Chat"
            color="blue"
            onClick={() => {
              // TODO: Archive Chat
              alert('Coming Soon');
            }}
          />
        </List>
      </Card>
    </div>
  );
}

export default ChatListItemContextMenu;
