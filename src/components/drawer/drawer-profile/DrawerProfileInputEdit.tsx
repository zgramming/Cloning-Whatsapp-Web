import { useEffect } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

type DrawerProfileInpuEditType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onEscPressed: () => void;
};

function DrawerProfileInputEdit({ value, onChange, onSave, onEscPressed }: DrawerProfileInpuEditType) {
  useEffect(() => {
    const onEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscPressed();
      }
    };

    const onEnterHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSave();
      }
    };

    window.addEventListener('keydown', onEscHandler);
    window.addEventListener('keydown', onEnterHandler);
    return () => {
      window.removeEventListener('keydown', onEscHandler);
      window.removeEventListener('keydown', onEnterHandler);
    };
  }, [onEscPressed, onSave]);

  return (
    <div className="flex flex-row items-center">
      <div className="grow">
        <TextInput variant="unstyled" autoFocus defaultValue={value} onChange={onChange} />
      </div>
      <ActionIcon onClick={onSave}>
        <IconCheck className="text-gray-500" />
      </ActionIcon>
    </div>
  );
}

export default DrawerProfileInputEdit;
