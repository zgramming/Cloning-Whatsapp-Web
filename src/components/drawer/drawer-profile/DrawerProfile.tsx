import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { Card, Divider, List, Transition } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCamera, IconEye, IconTrash, IconUpload } from '@tabler/icons-react';
import ContextMenuItem from '@/components/ContextMenuItem';
import { AuthContext } from '@/context/AuthContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { asyncUserUpdateProfile, asyncUserUpdateProfilePicture } from '@/redux-toolkit/feature/user/user.thunk';
import { BASE_URL_USER_PROFILE_IMAGE_API, PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';
import { errorHandler } from '@/utils/error-handler';

import DrawerHeader from '../../DrawerHeader';
import DrawerProfileInputEdit from './DrawerProfileInputEdit';
import DrawerProfileInputPreview from './DrawerProfileInputPreview';

function DrawerProfileAvatar() {
  const dispatch = useAppDispatch();
  const { user, setUser } = useContext(AuthContext);

  const el = useRef<HTMLDivElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const userImageUrl = user?.avatar ? `${BASE_URL_USER_PROFILE_IMAGE_API}/${user.avatar}` : PATH_DEFAULT_ASSET_IMAGE;

  const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.currentTarget.files?.[0];
      if (!file) return false;

      const result = await dispatch(asyncUserUpdateProfilePicture(file)).unwrap();

      if (!result.success) {
        throw new Error(result.message);
      }

      // Update user in context auth
      setUser(result.data);

      notifications.show({
        title: 'Success',
        message: result.message,
        color: 'green',
      });

      return true;
    } catch (error) {
      const result = errorHandler(error);

      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });

      return false;
    } finally {
      /// Reset input file value
      refFile.current!.value = '';
    }
  };

  // Effect for close context menu
  useEffect(() => {
    const closeContextMenu = () => setIsOpen(false);
    const onEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContextMenu();
      }
    };

    window.addEventListener('mousedown', closeContextMenu);
    window.addEventListener('keydown', onEscHandler);

    return () => {
      window.removeEventListener('mousedown', closeContextMenu);
      window.removeEventListener('keydown', onEscHandler);
    };
  }, []);

  return (
    <>
      {/* Hidden Input File */}
      <input ref={refFile} type="file" className="hidden" onChange={onUploadHandler} />
      <div className="flex flex-col py-5">
        <div
          ref={el}
          className="relative w-40 h-40 self-center cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Image alt="Image Avatar" src={userImageUrl} className="rounded-full" fill />

          <Transition mounted={isHover} transition="fade" duration={500} timingFunction="ease-in-out">
            {(transitionStyles) => (
              <div
                role="presentation"
                className="absolute w-40 h-40 rounded-full bg-black/50"
                style={{
                  ...transitionStyles,
                }}
                onClick={(e) => {
                  const rect = el.current?.getBoundingClientRect();
                  const rectX = rect?.x || 0;
                  const rectY = rect?.y || 0;
                  const x = e.clientX - rectX;
                  const y = e.clientY - rectY;
                  setPoints({ x, y });
                  setIsOpen(true);
                }}
              >
                <div className="flex flex-col justify-center items-center h-full text-white text-sm">
                  <IconCamera size="2rem" />
                  <div>Update foto profile</div>
                </div>
              </div>
            )}
          </Transition>

          <Transition mounted={isOpen} transition="scale" duration={500} timingFunction="ease-in-out">
            {(transitionStyles) => (
              <Card
                padding={0}
                shadow="lg"
                radius="md"
                className="min-w-[200px] z-10"
                withBorder
                style={{
                  ...transitionStyles,
                  position: 'absolute',
                  top: points.y,
                  left: points.x,
                }}
              >
                <List spacing={0} size="sm" className="py-3" center>
                  <ContextMenuItem icon={<IconEye size="1rem" />} text="Lihat Foto" color="lime" onClick={() => {}} />
                  <ContextMenuItem
                    icon={<IconUpload size="1rem" />}
                    text="Upload Foto"
                    color="blue"
                    onClick={() => {
                      refFile.current?.click();
                    }}
                  />
                  <ContextMenuItem icon={<IconTrash size="1rem" />} text="Hapus Foto" color="red" onClick={() => {}} />
                </List>
              </Card>
            )}
          </Transition>
        </div>
      </div>
    </>
  );
}

function DrawerProfileInpuBio() {
  const { user, setUser } = useContext(AuthContext);

  const [isModeEdit, setIsModeEdit] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');

  const dispatch = useAppDispatch();

  const onSave = async () => {
    try {
      const result = await dispatch(
        asyncUserUpdateProfile({
          name: user?.name || '',
          bio,
        }),
      ).unwrap();

      if (!result.success) {
        throw new Error(result.message);
      }

      setIsModeEdit(false);

      // Update user in context auth
      setUser(result.data);

      notifications.show({
        title: 'Success',
        message: result.message,
        color: 'green',
      });
    } catch (error) {
      const result = errorHandler(error);
      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="font-semibold text-primary-teal text-xs">Tentang Kamu</div>
      {isModeEdit ? (
        <DrawerProfileInputEdit
          value={bio}
          onEscPressed={() => setIsModeEdit(false)}
          onChange={(e) => setBio(e.currentTarget.value)}
          onSave={onSave}
        />
      ) : (
        <DrawerProfileInputPreview
          value={bio}
          onClick={() => {
            setIsModeEdit(true);
          }}
        />
      )}
    </div>
  );
}

function DrawerProfileInputName() {
  const { user, setUser } = useContext(AuthContext);

  const [isModeEdit, setIsModeEdit] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const dispatch = useAppDispatch();

  const onSave = async () => {
    try {
      const result = await dispatch(
        asyncUserUpdateProfile({
          name,
        }),
      ).unwrap();

      if (!result.success) {
        throw new Error(result.message);
      }

      setIsModeEdit(false);

      // Update user in context auth
      setUser(result.data);

      notifications.show({
        title: 'Success',
        message: result.message,
        color: 'green',
      });
    } catch (error) {
      const result = errorHandler(error);
      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="font-semibold text-primary-teal text-xs">Nama Kamu</div>
      {isModeEdit ? (
        <DrawerProfileInputEdit
          value={name}
          onEscPressed={() => setIsModeEdit(false)}
          onChange={(e) => setName(e.currentTarget.value)}
          onSave={onSave}
        />
      ) : (
        <DrawerProfileInputPreview
          value={name}
          onClick={() => {
            setIsModeEdit(true);
          }}
        />
      )}
    </div>
  );
}

function DrawerProfile() {
  return (
    <div className="flex flex-col min-h-full">
      <DrawerHeader title="Profile" />
      <div className="grow flex flex-col overflow-auto h-[0]">
        <DrawerProfileAvatar />
        <Divider />
        <DrawerProfileInputName />
        <Divider />
        <DrawerProfileInpuBio />
        <Divider />
      </div>
    </div>
  );
}

export default DrawerProfile;
