import { List, MantineColor, ThemeIcon } from '@mantine/core';

type ContextMenuItemType = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  color: MantineColor;
};

function ContextMenuItem({ color, icon, onClick, text }: ContextMenuItemType) {
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

export default ContextMenuItem;
