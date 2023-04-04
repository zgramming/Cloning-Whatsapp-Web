import { ReactNode } from 'react';

type DrawerChatTileProps = {
  avatar: ReactNode;
  name: string;
  description?: string;
  onClick?: () => void;
};

function DrawerChatTile({ avatar, name, description, onClick }: DrawerChatTileProps) {
  return (
    <div
      role="presentation"
      className="flex flex-row items-center gap-3 p-3 hover:bg-gray-100 hover:cursor-pointer"
      onClick={onClick}
    >
      {avatar}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{name}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
    </div>
  );
}

DrawerChatTile.defaultProps = {
  description: undefined,
  onClick: undefined,
};

export default DrawerChatTile;
