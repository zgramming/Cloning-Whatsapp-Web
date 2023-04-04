import { TextInput, Loader, Avatar } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/use-dispatch-selector';
import { asyncUserByPhone } from '@/redux-toolkit/feature/user/user-filtered-phone.slice';
import DrawerHeader from '../DrawerHeader';
import DrawerChatTile from './DrawerChatTile';

function DrawerSearchPerson() {
  const { loading, error, user } = useAppSelector((state) => state.userFilteredPhone);

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

    return () => {};
  }, [dispatch, enteredPhone]);

  return (
    <div className="flex flex-col">
      <DrawerHeader title="Cari orang" />
      <div className="flex flex-col gap-5">
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
        {!loading && !error && user && (
          <DrawerChatTile
            avatar={<Avatar radius="xl" size="lg" color="green" />}
            name={user?.name}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default DrawerSearchPerson;
