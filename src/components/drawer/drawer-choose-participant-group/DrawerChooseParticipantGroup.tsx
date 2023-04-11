import { useContext, useState } from 'react';

import { Button, Chip, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import DrawerHeader from '@/components/DrawerHeader';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import useContactSelector from '@/hooks/use-contact-selector';
import { ContactMe } from '@/interface/contact/contact.me.interface';

import DrawerChatYourContact from '../drawer-chat/DrawerChatYourContact';
import DrawerCreateGroup from '../drawer-create-group/DrawerCreateGroup';

function DrawerChooseParticipantGroup() {
  const { push } = useContext(DrawerNavigationStackContext);

  const { groupedContactByFirstChar } = useContactSelector();

  const [enteredName, setEnteredName] = useState('');
  const [temporaryContact, setTemporaryContact] = useState(groupedContactByFirstChar);
  const [selectedParticipant, setSelectedParticipant] = useState<ContactMe[]>([]);

  const isHaveSelectedParticipant = selectedParticipant.length > 0;

  const onAddParticipantHandler = (contact: ContactMe) => {
    const { id } = contact;

    const isExist = selectedParticipant.find((participant) => participant.id === id);

    if (isExist) {
      const filtered = selectedParticipant.filter((participant) => participant.id !== id);
      setSelectedParticipant(filtered);
      return;
    }

    setSelectedParticipant((prev) => [...prev, contact]);
  };

  const onSearchHandler = (value: string) => {
    setEnteredName(value);

    if (value === '') {
      setTemporaryContact(groupedContactByFirstChar);
      return false;
    }

    const filtered = groupedContactByFirstChar.map(([firstLetter, contacts]) => {
      const filteredContacts = contacts.filter((contact) => {
        const name = contact.user.name.toLowerCase();
        return name.includes(value.toLowerCase());
      });

      const result = [firstLetter, filteredContacts] as [string, ContactMe[]];

      return result;
    });

    setTemporaryContact(filtered);

    return true;
  };

  return (
    <div className="flex flex-col min-h-full">
      <DrawerHeader title="Pilih Anggota" />
      <div className="p-3">
        <TextInput
          defaultValue={enteredName}
          placeholder="Cari nama"
          variant="filled"
          icon={<IconSearch size="1rem" />}
          onChange={(e) => onSearchHandler(e.currentTarget.value)}
        />
      </div>
      {isHaveSelectedParticipant && (
        <div className="flex flex-wrap gap-3 p-3">
          {selectedParticipant.map((participant) => (
            <Chip key={participant.id} size="xs" onClick={() => onAddParticipantHandler(participant)} checked>
              {participant.user.name}
            </Chip>
          ))}
        </div>
      )}
      <div className="grow flex flex-col gap-5 h-[0] overflow-auto">
        <DrawerChatYourContact
          items={temporaryContact}
          onClick={onAddParticipantHandler}
          builderClass={(contact) => {
            const isActive = selectedParticipant.includes(contact);
            if (isActive) return 'bg-green-500 dark:bg-slate-600';
            return '';
          }}
        />
      </div>

      {isHaveSelectedParticipant && (
        <Button
          color="green"
          size="xl"
          onClick={() => push(<DrawerCreateGroup participants={selectedParticipant} />)}
          uppercase
        >
          LANJUT
        </Button>
      )}
    </div>
  );
}

export default DrawerChooseParticipantGroup;
