import Image from 'next/image';

import { Badge, Divider, Modal } from '@mantine/core';
import {
  IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconMail,
} from '@tabler/icons-react';
import { AboutDeveloperInterface } from '@/interface/about.developer.interface';
import { PATH_AVATAR_DEVELOPER } from '@/utils/constant';
import { openInNewTab } from '@/utils/function';

const DEVELOPER: AboutDeveloperInterface = {
  name: 'Zeffry Reynando',
  avatar: PATH_AVATAR_DEVELOPER,
  bio: 'Software Developer',
  socialMedias: [
    {
      name: 'Github',
      url: 'https://github.com/zgramming',
      icon: <IconBrandGithub size="1rem " />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/zeffry-reynando/',
      icon: <IconBrandLinkedin size="1rem " />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/zeffry_reynando/',
      icon: <IconBrandInstagram size="1rem  " />,
    },
    {
      name: 'Email',
      url: 'zeffry.reynando@gmail.com',
      icon: <IconMail size="1rem  " />,
    },
  ],
};

type DrawerSettingModalAboutProps = {
  isOpenModalAbout: boolean;
  closeModalAbout: () => void;
};
function DrawerSettingModalAbout({ closeModalAbout, isOpenModalAbout }: DrawerSettingModalAboutProps) {
  return (
    <Modal opened={isOpenModalAbout} onClose={closeModalAbout} title="Tentang Developer" centered>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <div className="relative h-20 w-20 rounded-full">
            <Image alt="Image Developer" src={DEVELOPER.avatar} className="rounded-full" fill />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-normal">{DEVELOPER.name}</h3>
            <p className="text-sm text-gray-500">{DEVELOPER.bio}</p>
          </div>
        </div>
        <Divider />
        <div className="flex flex-wrap items-center justify-center gap-1">
          {DEVELOPER.socialMedias.map((socialMedia) => {
            const { icon, name, url } = socialMedia;

            return (
              <Badge
                key={name}
                size="xs"
                p="sm"
                color="teal"
                radius="xl"
                leftSection={icon}
                className="hover:cursor-pointer"
                onClick={() => openInNewTab(url)}
              >
                {name}
              </Badge>
            );
          })}
        </div>
        <Divider />
      </div>
    </Modal>
  );
}

export default DrawerSettingModalAbout;
