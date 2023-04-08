import { useContext } from 'react';

import { Avatar, TextInput } from '@mantine/core';
import { IconSearch, IconUser, IconUsers } from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';

import DrawerHeader from '../../DrawerHeader';
import DrawerSearchPerson from '../drawer-search-person/DrawerSearchPerson';
import DrawerChatTile from './DrawerChatTile';
import DrawerChatYourContact from './DrawerChatYourContact';

function DrawerChat() {
  const { push } = useContext(DrawerNavigationStackContext);
  return (
    <div className="flex flex-col min-h-full">
      <DrawerHeader title="Pesan Baru" />
      <div className="p-3">
        <TextInput placeholder="Cari Kontak" variant="filled" icon={<IconSearch size="1rem" />} />
      </div>

      {/* h-[0] / h-0 to make this element can be scrollable, with note parent element height should be full height */}
      <div className="grow flex flex-col overflow-auto h-[0]">
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
        <DrawerChatYourContact />
      </div>
    </div>
    // <div className="flex flex-col">
    //   <DrawerHeader title="Pesan Baru" />
    // <div className="p-3">
    //   <TextInput placeholder="Cari Kontak" variant="filled" icon={<IconSearch size="1rem" />} />
    // </div>
    //   <div className="flex flex-col">
    //     <DrawerChatTile
    //       name="Pesan Pribadi"
    //       avatar={
    //         <Avatar radius="xl" size="lg" color="green">
    //           <IconUser size="1.5rem" />
    //         </Avatar>
    //       }
    //       onClick={() => push(<DrawerSearchPerson key="DrawerSearchPerson" />)}
    //     />
    //     <DrawerChatTile
    //       name="Group"
    //       avatar={
    //         <Avatar radius="xl" size="lg" color="green">
    //           <IconUsers size="1.5rem" />
    //         </Avatar>
    //       }
    //     />
    //     <DrawerChatYourContact />
    //     <DrawerChatYourContact />
    //     <DrawerChatYourContact />
    //     <DrawerChatYourContact />
    //   </div>
    // </div>
  );
}

export default DrawerChat;
