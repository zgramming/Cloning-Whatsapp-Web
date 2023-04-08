import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Button, Card, List, TextInput, Transition } from '@mantine/core';
import { IconCamera, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import ContextMenuItem from '@/components/ContextMenuItem';
import DrawerHeader from '@/components/DrawerHeader';
import { ContactMe } from '@/interface/contact/contact.me.interface';
import { PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';

type DrawerCreateGroupProps = {
  participants: ContactMe[];
};

function DrawerCreateGroupAvatar() {
  const refFile = useRef<HTMLInputElement>(null);
  const el = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  // Effect for close context menu
  useEffect(() => {
    const closeContextMenu = () => setIsOpen(false);
    const onEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContextMenu();
      }
    };

    window.addEventListener('mousedown', closeContextMenu);
    window.addEventListener('keydown', onEscHandler);

    return () => {
      window.removeEventListener('mousedown', closeContextMenu);
      window.removeEventListener('keydown', onEscHandler);
    };
  }, []);

  const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];

    if (!file) return false;

    return true;
  };

  return (
    <>
      {/* Hidden Input File */}
      <input ref={refFile} type="file" className="hidden" onChange={onUploadHandler} />
      <div className="flex flex-col items-center justify-center py-5">
        <div
          ref={el}
          className="relative w-40 h-40 cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Image alt="Choose image profile group" src={PATH_DEFAULT_ASSET_IMAGE} className="rounded-full" fill />
          <Transition mounted={isHover} transition="fade" duration={500} timingFunction="ease-in-out">
            {(transitionStyles) => (
              <div
                role="presentation"
                className="absolute w-40 h-40 rounded-full bg-black/50"
                style={{
                  ...transitionStyles,
                }}
                onClick={(e) => {
                  const rect = el.current?.getBoundingClientRect();
                  const rectX = rect?.x || 0;
                  const rectY = rect?.y || 0;
                  const x = e.clientX - rectX;
                  const y = e.clientY - rectY;
                  setPoints({ x, y });
                  setIsOpen(true);
                }}
              >
                <div className="flex flex-col justify-center items-center h-full text-white text-sm">
                  <IconCamera size="2rem" />
                  <div>Tambah Grup Ikon</div>
                </div>
              </div>
            )}
          </Transition>
          <Transition mounted={isOpen} transition="scale" duration={500} timingFunction="ease-in-out">
            {(transitionStyles) => (
              <Card
                padding={0}
                shadow="lg"
                radius="md"
                className="min-w-[200px] z-10"
                withBorder
                style={{
                  ...transitionStyles,
                  position: 'absolute',
                  top: points.y,
                  left: points.x,
                }}
              >
                <List spacing={0} size="sm" className="py-3" center>
                  <ContextMenuItem
                    icon={<IconUpload size="1rem" />}
                    text="Upload Foto"
                    color="blue"
                    onClick={() => {
                      refFile.current?.click();
                    }}
                  />
                </List>
              </Card>
            )}
          </Transition>
        </div>
      </div>
    </>
  );
}

function DrawerCreateGroup({ participants }: DrawerCreateGroupProps) {
  const [enteredName, setEnteredName] = useState('');

  const isEmptyName = enteredName.trim().length === 0;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    alert(participants.length);

    const { value } = e.currentTarget;

    setEnteredName(value);
  };

  return (
    <div className="flex flex-col min-h-full">
      <DrawerHeader title="Kelompok Baru" />
      <div className="grow flex flex-col overflow-auto h-[0]">
        <DrawerCreateGroupAvatar />
        <div className="px-5">
          <TextInput
            placeholder="Nama Grup"
            label="Nama"
            defaultValue={enteredName}
            onChange={onChangeHandler}
            withAsterisk
          />
        </div>
        <div className="p-5">
          <Button leftIcon={<IconDeviceFloppy size="1rem" />} className="w-full" disabled={isEmptyName}>
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DrawerCreateGroup;
