import { ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

function DrawerProfileInputPreview({ value, onClick }: { value: string; onClick: () => void }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-gray-500 text-base line-clamp-1">{value}</div>
      <ActionIcon onClick={onClick}>
        <IconEdit className="text-gray-500" />
      </ActionIcon>
    </div>
  );
}

export default DrawerProfileInputPreview;
