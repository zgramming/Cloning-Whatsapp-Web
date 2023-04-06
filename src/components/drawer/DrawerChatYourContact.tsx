import { useContext, useMemo } from 'react';

import { Avatar } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppSelector } from '@/hooks/use-dispatch-selector';

import DrawerChatTile from './DrawerChatTile';

function DrawerChatYourContact() {
  const { popAll: closeAllDrawerStack } = useContext(DrawerNavigationStackContext);
  const { setId } = useContext(SelectedChatListContext);

  const groups = useAppSelector((state) => state.group.items);
  const groupedGroupedByFirstLetter = useMemo(() => {
    const grouped = groups.reduce((acc, curr) => {
      let firstLetter = '';

      // Get first letter of group name or first letter of group member name
      if (curr.type === 'GROUP') {
        const first = curr.name.toUpperCase()[0];
        firstLetter = first;
      } else {
        const first = curr.interlocutors?.name.toUpperCase()[0] ?? '';
        firstLetter = first;
      }

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

  return (
    <div className="flex flex-col">
      <h3 className="p-3 font-semibold">Kontak Kamu</h3>
      {groupedGroupedByFirstLetter.map(([firstLetter, items]) => (
        <div key={firstLetter} className="flex flex-col">
          <h3 className="px-5 text-primary-teal font-normal">{firstLetter}</h3>
          {items.map((group) => {
            const { id, name: nameGroup, group_member: groupMember } = group;
            const [firstMember] = groupMember;
            if (group.type === 'GROUP') {
              return (
                <DrawerChatTile
                  key={id}
                  name={nameGroup}
                  avatar={
                    <Avatar radius="xl" size="lg" color="green">
                      <IconUsers size="1.5rem" />
                    </Avatar>
                  }
                />
              );
            }

            return (
              <DrawerChatTile
                key={id}
                avatar={<Avatar radius="xl" size="lg" color="green" />}
                name={firstMember.user.name}
                onClick={() => {
                  closeAllDrawerStack();
                  setId(id);
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
