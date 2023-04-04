import { useContext, useEffect, useState } from 'react';

import { Avatar, Loader, LoadingOverlay, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch, useAppSelector } from '@/hooks/use-dispatch-selector';
import { asyncCreatePrivateGroup } from '@/redux-toolkit/feature/group/group.thunk';
import { asyncUserByPhone, resetUserFilteredPhone } from '@/redux-toolkit/feature/user/user-filtered-phone.slice';

import DrawerHeader from '../DrawerHeader';
import DrawerChatTile from './DrawerChatTile';

function DrawerSearchPerson() {
  const { setId } = useContext(SelectedChatListContext);
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
    <div className="flex flex-col">
      <DrawerHeader title="Cari orang" />
      <div className="flex flex-col gap-5">
        <LoadingOverlay visible={onLoadingCreatePrivateGroup} overlayBlur={2} />

        <div className="p-3">
          <TextInput
            defaultValue={enteredPhone}
            placeholder="Cari orang"
            variant="filled"
            icon={loadingEnteredPhone ? <Loader size="sm" /> : <IconSearch size="1rem" />}
            onChange={(e) => {
              setLoadingEnteredPhone(true);
              setEnteredPhone(e.currentTarget.value);
            }}
          />
        </div>
        {!loading && !error && responseOnFilteredUser && (
          <DrawerChatTile
            avatar={<Avatar radius="xl" size="lg" color="green" />}
            name={responseOnFilteredUser.data.name}
            onClick={async () => {
              const { group, data: user } = responseOnFilteredUser;

              /// Check if user has private group with the filtered user
              if (!group) {
                try {
                  setOnLoadingCreatePrivateGroup(true);
                  const result = await dispatch(asyncCreatePrivateGroup(user.id)).unwrap();
                  closeAllStackDrawer();
                  setId(result.data.id);
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
                setId(group.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DrawerSearchPerson;
