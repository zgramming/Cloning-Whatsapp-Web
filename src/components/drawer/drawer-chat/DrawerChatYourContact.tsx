import { Avatar } from '@mantine/core';
import { ContactMe } from '@/interface/contact/contact.me.interface';
import { PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';

import DrawerChatTile from './DrawerChatTile';

type DrawerChatYourContactProps = {
  items: [string, ContactMe[]][];
  onClick: (contact: ContactMe) => void;
  builderClass?: (contact: ContactMe) => string;
};

function DrawerChatYourContact({ items, builderClass, onClick }: DrawerChatYourContactProps) {
  if (items.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-center text-primary-teal">Tidak ada kontak</p>
      </div>
    );
  }

  return (
    <>
      {items.map(([firstLetter, contacts]) => (
        <div key={firstLetter} className="flex flex-col">
          {contacts.length > 0 && <h3 className="px-5 text-primary-teal font-normal">{firstLetter}</h3>}
          {contacts.map((contact) => {
            const { id, user } = contact;
            const className = builderClass?.(contact);
            return (
              <DrawerChatTile
                key={id}
                avatar={<Avatar radius="xl" size="md" color="green" src={user.avatar || PATH_DEFAULT_ASSET_IMAGE} />}
                name={user.name}
                className={className}
                onClick={() => onClick(contact)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

DrawerChatYourContact.defaultProps = {
  builderClass: () => '',
};

export default DrawerChatYourContact;
