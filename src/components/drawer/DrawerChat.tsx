import { TextInput, Avatar } from '@mantine/core';
import { IconSearch, IconUser, IconUsers } from '@tabler/icons-react';
import { useContext } from 'react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import DrawerHeader from '../DrawerHeader';
import DrawerChatTile from './DrawerChatTile';
import DrawerChatYourContact from './DrawerChatYourContact';
import DrawerSearchPerson from './DrawerSearchPerson';

function DrawerChat() {
  const { push } = useContext(DrawerNavigationStackContext);
  return (
    <div className="flex flex-col">
      <DrawerHeader title="Pesan Baru" />
      <div className="flex flex-col">
        <div className="p-3">
          <TextInput placeholder="Cari Kontak" variant="filled" icon={<IconSearch size="1rem" />} />
        </div>
        <div className="flex flex-col">
          <DrawerChatTile
            name="Pesan Pribadi"
            avatar={
              <Avatar radius="xl" size="lg" color="green">
                <IconUser size="1.5rem" />
              </Avatar>
            }
            onClick={() => push(<DrawerSearchPerson key="DrawerSearchPerson" />)}
          />
          <DrawerChatTile
            name="Group"
            avatar={
              <Avatar radius="xl" size="lg" color="green">
                <IconUsers size="1.5rem" />
              </Avatar>
            }
          />
        </div>
        <DrawerChatYourContact />
      </div>
    </div>
  );
}

export default DrawerChat;
