import { useRouter } from 'next/router';
import { useContext } from 'react';

import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core';
import {
  IconDotsVertical,
  IconHistoryToggle,
  IconLogout,
  IconMessage,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import API from '@/utils/api';
import { routes } from '@/utils/routes';

import DrawerChat from '../drawer/DrawerChat';
import DrawerSetting from '../drawer/DrawerSetting';

function ChatListHeader() {
  const { push } = useContext(DrawerNavigationStackContext);
  const { replace } = useRouter();
  const { setId } = useContext(SelectedChatListContext);
  return (
    <div className="h-16 bg-gray-100 px-5 py-3">
      <div className="flex flex-row items-center h-full">
        <Tooltip label="Coming Soon">
          <Avatar radius="xl" className="hover:cursor-pointer" />
        </Tooltip>
        <div className="grow flex flex-wrap justify-end gap-5">
          <Tooltip label="Coming Soon">
            <ActionIcon>
              <IconUsersGroup />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Coming Soon">
            <ActionIcon>
              <IconHistoryToggle />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Coming Soon">
            <ActionIcon
              onClick={() => {
                push(<DrawerChat key="DrawerChat" />);
              }}
            >
              <IconMessage />
            </ActionIcon>
          </Tooltip>
          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconSettings size={14} />}
                onClick={() => {
                  push(<DrawerSetting />);
                }}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={14} />}
                onClick={() => {
                  /// Clear context selected chat list
                  setId(undefined);
                  API.logout();

                  replace(routes.login);
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ChatListHeader;
