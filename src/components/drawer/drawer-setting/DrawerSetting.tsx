import { TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrush, IconSearch, IconUserCode, IconWallpaper } from '@tabler/icons-react';
import DrawerMenu from '@/components/DrawerMenu';
import DrawerHeader from '@/components/DrawerHeader';

import DrawerSettingModalAbout from './DrawerSettingModalAbout';
import DrawerSettingModalChatWalpapper from './DrawerSettingModalChatWalpapper';
import DrawerSettingModalTheme from './DrawerSettingModalTheme';
import DrawerSettingProfilePreview from './DrawerSettingProfilePreview';

function DrawerSetting() {
  const [isOpenModalAbout, { open: openModalAbout, close: closeModalAbout }] = useDisclosure(false);
  const [isOpenModalWalpapper, { open: openModalWalpapper, close: closeModalWalpapper }] = useDisclosure(false);
  const [isOpenModalTheme, { open: openModalTheme, close: closeModalTheme }] = useDisclosure(false);

  return (
    <>
      <div className="flex flex-col min-h-full">
        <DrawerHeader title="Setting" />
        <div className="p-3">
          <TextInput placeholder="Cari Pengaturan" variant="filled" icon={<IconSearch size="1rem" />} />
        </div>
        <div className="grow flex flex-col overflow-auto h-[0]">
          <DrawerSettingProfilePreview />
          <DrawerMenu
            title="Chat Wallpaper"
            description={`
          Ubah wallpaper chat
        `}
            icon={<IconWallpaper />}
            onClick={openModalWalpapper}
          />
          <DrawerMenu title="Tema" description="Ubah tema aplikasi ini" icon={<IconBrush />} onClick={openModalTheme} />
          <DrawerMenu
            title="Tentang Developer"
            description="Detail tentang developer aplikasi ini yang tampan dan ganteng"
            icon={<IconUserCode />}
            onClick={openModalAbout}
          />
        </div>
      </div>
      <DrawerSettingModalChatWalpapper
        closeModalChatWallpaper={closeModalWalpapper}
        isOpenModalChatWallpaper={isOpenModalWalpapper}
      />
      <DrawerSettingModalTheme closeModalTheme={closeModalTheme} isOpenModalTheme={isOpenModalTheme} />
      <DrawerSettingModalAbout closeModalAbout={closeModalAbout} isOpenModalAbout={isOpenModalAbout} />
    </>
  );
}

export default DrawerSetting;
