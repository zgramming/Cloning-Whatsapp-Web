import { useContext, useEffect, useState } from 'react';

import { Avatar, Loader, LoadingOverlay, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import DrawerHeader from '@/components/DrawerHeader';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { resetUserFilteredPhone } from '@/redux-toolkit/feature/user/user-filtered-phone.slice';
import { asyncUserByPhone } from '@/redux-toolkit/feature/user/user.thunk';

import DrawerChatTile from '../drawer-chat/DrawerChatTile';
import { asyncCreatePrivateConversation } from '@/redux-toolkit/feature/group/conversation.thunk';

function DrawerSearchPerson() {
  const { setConversationId } = useContext(SelectedChatListContext);
  const { popAll: closeAllStackDrawer } = useContext(DrawerNavigationStackContext);

  const [onLoadingCreatePrivateGroup, setOnLoadingCreatePrivateGroup] = useState(false);

  const { loading, error, response: responseOnFilteredUser } = useAppSelector((state) => state.userFilteredPhone);

  const [enteredPhone, setEnteredPhone] = useDebouncedState<string>('', 1000);
  const [loadingEnteredPhone, setLoadingEnteredPhone] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingEnteredPhone(false);
    if (enteredPhone.length > 0) {
      dispatch(asyncUserByPhone(enteredPhone))
        .unwrap()
        .catch((err) => {
          notifications.show({
            title: 'Error',
            message: err,
            color: 'red',
          });
        });
    }

    return () => {
      /// Reset userFilteredPhone on unmount
      dispatch(resetUserFilteredPhone());
    };
  }, [dispatch, enteredPhone]);

  return (
    <div className="flex flex-col min-h-full ">
      <DrawerHeader title="Cari orang" />
      <LoadingOverlay visible={onLoadingCreatePrivateGroup} overlayBlur={2} />

      <div className="p-3">
        <TextInput
          defaultValue={enteredPhone}
          placeholder="Cari orang berdasarkan nomor telepon"
          variant="filled"
          icon={loadingEnteredPhone ? <Loader size="sm" /> : <IconSearch size="1rem" />}
          onChange={(e) => {
            setLoadingEnteredPhone(true);
            setEnteredPhone(e.currentTarget.value);
          }}
        />
      </div>
      <div className="grow flex flex-col gap-5 h-[0] overflow-auto">
        {!loading && !error && responseOnFilteredUser && (
          <DrawerChatTile
            avatar={<Avatar radius="xl" size="lg" color="green" />}
            name={responseOnFilteredUser.data.name}
            onClick={async () => {
              const { group, data: user } = responseOnFilteredUser;

              /// Create private group if not exist and set selected chat to private group
              /// Otherwise set selected chat to private group that already exist
              if (!group) {
                try {
                  setOnLoadingCreatePrivateGroup(true);
                  const result = await dispatch(asyncCreatePrivateConversation(user.id)).unwrap();

                  // Close all stack drawer and set selected chat
                  closeAllStackDrawer();
                  setConversationId(result.data.id);
                } catch (err) {
                  notifications.show({
                    title: 'Error',
                    message: err as string,
                    color: 'red',
                  });
                } finally {
                  setOnLoadingCreatePrivateGroup(false);
                }
              } else {
                closeAllStackDrawer();
                setConversationId(group.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DrawerSearchPerson;
