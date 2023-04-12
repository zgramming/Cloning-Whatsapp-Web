import { useContext } from 'react';

import { Avatar, TextInput } from '@mantine/core';
import { IconSearch, IconUser, IconUsers } from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import useContactSelector from '@/hooks/use-contact-selector';

import DrawerHeader from '../../DrawerHeader';
import DrawerChooseParticipantGroup from '../drawer-choose-participant-group/DrawerChooseParticipantGroup';
import DrawerSearchPerson from '../drawer-search-person/DrawerSearchPerson';
import DrawerChatTile from './DrawerChatTile';
import DrawerChatYourContact from './DrawerChatYourContact';

function DrawerChat() {
  const { groupedContactByFirstChar } = useContactSelector();

  const { push, popAll: closeAllDrawerStack } = useContext(DrawerNavigationStackContext);
  const { setConversationId } = useContext(SelectedChatListContext);

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
          onClick={() => push(<DrawerChooseParticipantGroup />)}
        />
        <div className="grow flex flex-col">
          <h3 className="p-3 font-semibold">Kontak Kamu</h3>
          <DrawerChatYourContact
            items={groupedContactByFirstChar}
            onClick={({ conversation_id: conversationId }) => {
              setConversationId(conversationId);
              closeAllDrawerStack();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DrawerChat;
