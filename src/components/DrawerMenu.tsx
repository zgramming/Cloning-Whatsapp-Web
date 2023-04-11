import { IconUser } from '@tabler/icons-react';

type DrawerMenuProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

function DrawerMenu({
  description = '',
  icon = <IconUser size="1.5rem" />,
  onClick = () => {},
  title = '',
}: DrawerMenuProps) {
  return (
    <div
      role="presentation"
      className={`
  flex flex-row items-center gap-5 p-5
  border-solid border-0 border-b border-t border-gray-200
  hover:bg-gray-100 hover:cursor-pointer
  dark:hover:bg-slate-700 dark:border-gray-700
  `}
      onClick={onClick}
    >
      {icon}
      <div className="flex flex-col gap-1">
        <p className="text-base font-normal">{title}</p>
        {description && <p className="text-xs text-gray-500 line-clamp-1">{description}</p>}
      </div>
    </div>
  );
}

export default DrawerMenu;
