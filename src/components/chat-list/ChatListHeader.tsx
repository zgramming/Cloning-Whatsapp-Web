import { useRouter } from 'next/router';
import { useContext } from 'react';

import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import API from '@/utils/api';
import { routes } from '@/utils/routes';
import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core';
import {
  IconDotsVertical,
  IconHistoryToggle,
  IconLogout,
  IconMessage,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react';

import DrawerHeader from '../DrawerHeader';

const DrawerSetting = () => {
  return (
    <div className="flex flex-col">
      <DrawerHeader title="Setting" />
      <div className="p-5">
        <h1>ss</h1>
      </div>
    </div>
  );
};

const ChatListHeader = () => {
  const { latestNode, push, nodes } = useContext(DrawerNavigationStackContext);
  const { replace } = useRouter();
  return (
    <div className="h-16 bg-gray-100 px-5 py-3">
      <div className="flex flex-row items-center h-full">
        <Avatar radius="xl" />
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
            <ActionIcon>
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
                onClick={(e) => {
                  push(<DrawerSetting />);
                }}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={14} />}
                onClick={(e) => {
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
};

export default ChatListHeader;
