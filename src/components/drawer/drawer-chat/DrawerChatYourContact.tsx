import { useContext, useEffect, useMemo } from 'react';

import { Avatar } from '@mantine/core';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncGetMyContact } from '@/redux-toolkit/feature/contact/contact.thunk';
import { PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';

import DrawerChatTile from './DrawerChatTile';

function DrawerChatYourContact() {
  const { popAll: closeAllDrawerStack } = useContext(DrawerNavigationStackContext);
  const { setId: emitGroupId } = useContext(SelectedChatListContext);

  const groups = useAppSelector((state) => state.contact.items);
  const dispatch = useAppDispatch();

  const groupedContactByFirstChar = useMemo(() => {
    const grouped = groups.reduce((acc, curr) => {
      // Get First Character of name
      const firstLetter = curr.user.name[0].toUpperCase();

      // Group by first letter
      if (acc[firstLetter]) {
        acc[firstLetter].push(curr);
      } else {
        acc[firstLetter] = [curr];
      }

      return acc;
    }, {} as { [key: string]: typeof groups });
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, [groups]);

  useEffect(() => {
    dispatch(asyncGetMyContact());
    return () => {};
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <h3 className="p-3 font-semibold">Kontak Kamu</h3>
      {groupedContactByFirstChar.map(([firstLetter, contacts]) => (
        <div key={firstLetter} className="flex flex-col">
          <h3 className="px-5 text-primary-teal font-normal">{firstLetter}</h3>
          {contacts.map((contact) => {
            const { id, user, group_id: groupId } = contact;

            return (
              <DrawerChatTile
                key={id}
                avatar={<Avatar radius="xl" size="md" color="green" src={user.avatar || PATH_DEFAULT_ASSET_IMAGE} />}
                name={user.name}
                onClick={() => {
                  closeAllDrawerStack();
                  emitGroupId(groupId);
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default DrawerChatYourContact;
