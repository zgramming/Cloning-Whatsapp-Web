import { useContext } from 'react';

import { Card, Modal } from '@mantine/core';
import { ApplicationConfigContext } from '@/context/ApplicationConfigContext';

const AVAILABLE_COLORS = [
  '#ffffff',
  '#B2A4FF',
  '#FFB4B4',
  '#FFDEB4',
  '#FDF7C3',
  '#FD8A8A',
  '#F1F7B5',
  '#A8D1D1',
  '#9EA1D4',
];

type DrawerSettingModalChatWalpapperProps = {
  isOpenModalChatWallpaper: boolean;
  closeModalChatWallpaper: () => void;
};
function DrawerSettingModalChatWalpapper({
  isOpenModalChatWallpaper,
  closeModalChatWallpaper,
}: DrawerSettingModalChatWalpapperProps) {
  const { chatWallpaperColor, setChatWallpaperColor } = useContext(ApplicationConfigContext);
  return (
    <Modal
      size="xl"
      opened={isOpenModalChatWallpaper}
      onClose={closeModalChatWallpaper}
      title="Chat Walpapper"
      centered
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col xl:flex-row ">
          <div className="basis-[100%] xl:basis-[30%] p-3">
            <div className="flex flex-wrap gap-5">
              {AVAILABLE_COLORS.map((color) => (
                <div
                  role="presentation"
                  key={color}
                  className={`
                  w-10 h-10 rounded-full shadow hover:cursor-pointer
                  border-solid border-[1px] border-black/50
                  hover:scale-125
                  `}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setChatWallpaperColor(color);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="basis-[100%] xl:basis-[70%] p-3">
            <Card padding={0} shadow="md" withBorder>
              <div className="flex flex-col ">
                <div className="text-center py-3">Walpapper Chat Preview</div>
                <div
                  className="flex flex-col-reverse h-96"
                  style={{
                    backgroundColor: chatWallpaperColor,
                  }}
                >
                  <Card p="xs" radius="lg" shadow="lg" className="self-end text-xs m-3">
                    Nama saya Zeffry Reynando
                  </Card>

                  <Card p="xs" radius="lg" shadow="lg" className="self-start text-xs m-3">
                    Halo nama kamu siapa?
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DrawerSettingModalChatWalpapper;
