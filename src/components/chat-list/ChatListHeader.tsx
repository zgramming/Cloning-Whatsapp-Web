import { useRouter } from 'next/router';
import { useContext } from 'react';

import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { IconDotsVertical, IconHistoryToggle, IconLogout, IconMessage, IconSettings } from '@tabler/icons-react';
import { AuthContext } from '@/context/AuthContext';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { SocketIOContext } from '@/context/SocketIOContext';
import API from '@/utils/api';
import { routes } from '@/utils/routes';

import DrawerChat from '../drawer/drawer-chat/DrawerChat';
import DrawerSetting from '../drawer/drawer-setting/DrawerSetting';
import ChatListHeaderAvatar from './ChatListHeaderAvatar';

function ChatListHeader() {
  const { replace } = useRouter();
  const { disconnect } = useContext(SocketIOContext);
  const { push } = useContext(DrawerNavigationStackContext);
  const { setConversationId } = useContext(SelectedChatListContext);
  const { user, setUser } = useContext(AuthContext);

  const onLogout = () => {
    /// 1. Logout from server
    /// 2. Disconnect from socket.io
    /// 3. Set user to undefined
    /// 4. Set selected chat to undefined
    /// 5. Redirect to login page

    API.logout();
    disconnect(user?.id || '');
    setUser(undefined);
    setConversationId(undefined);
    replace(routes.login);
  };

  return (
    <div
      className={`
      h-16 bg-gray-100 px-5 py-3
      dark:bg-slate-700
    `}
    >
      <div className="flex flex-row items-center h-full">
        <ChatListHeaderAvatar />
        <div className="grow flex flex-wrap justify-end gap-5">
          <Tooltip label="Coming Soon">
            <ActionIcon>
              <IconHistoryToggle />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Pesan Baru">
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
              <Menu.Item icon={<IconLogout size={14} />} onClick={onLogout}>
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
