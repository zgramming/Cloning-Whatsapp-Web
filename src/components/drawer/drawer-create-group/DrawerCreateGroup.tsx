import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { Button, Card, List, TextInput, Transition } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCamera, IconDeviceFloppy, IconUpload } from '@tabler/icons-react';
import ContextMenuItem from '@/components/ContextMenuItem';
import DrawerHeader from '@/components/DrawerHeader';
import { DrawerNavigationStackContext } from '@/context/DrawerNavigationStackContext';
import { SelectedChatListContext } from '@/context/SelectedChatListContext';
import { useAppDispatch } from '@/hooks/use-dispatch-selector';
import { ContactMe } from '@/interface/contact/contact.me.interface';
import { PATH_DEFAULT_ASSET_IMAGE } from '@/utils/constant';
import { errorHandler } from '@/utils/error-handler';
import { asyncCreateGroupConversation } from '@/redux-toolkit/feature/group/conversation.thunk';

type DrawerCreateGroupProps = {
  participants: ContactMe[];
};

type DrawerCreateGroupAvatarProps = {
  onSelectedImage: (file: File | undefined) => void;
};

function DrawerCreateGroupAvatar({ onSelectedImage }: DrawerCreateGroupAvatarProps) {
  const refFile = useRef<HTMLInputElement>(null);
  const el = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

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

  const convertFileSourceURLtoFileObject = async (sourceURL: string) => {
    const response = await fetch(sourceURL);
    const blob = await response.blob();

    const result = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

    onSelectedImage(result);

    return result;
  };

  const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const file = e.currentTarget.files?.[0];

      if (!file) return false;

      const imageType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!validImageTypes.includes(imageType)) {
        throw new Error(`Supported image types are ${validImageTypes.join(', ')}`);
      }

      const image = URL.createObjectURL(file);

      setSelectedImage(image);

      await convertFileSourceURLtoFileObject(image);

      return true;
    } catch (error) {
      const result = errorHandler(error);

      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });

      // Make input file value empty and reset selected image
      if (refFile.current) {
        setSelectedImage(undefined);
        refFile.current.value = '';
      }

      return false;
    }
  };

  return (
    <>
      {/* Hidden Input File */}
      <input ref={refFile} type="file" className="hidden" accept="image/*" onChange={onUploadHandler} />
      <div className="flex flex-col items-center justify-center py-5">
        <div
          ref={el}
          className="relative w-40 h-40 cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Image
            alt="Choose image profile group"
            src={selectedImage || PATH_DEFAULT_ASSET_IMAGE}
            className="rounded-full"
            fill
          />
          <Transition mounted={isHover} transition="fade" duration={500} timingFunction="ease-in-out">
            {(transitionStyles) => (
              <div
                role="presentation"
                className="absolute w-40 h-40 rounded-full bg-black/50"
                style={{
                  ...transitionStyles,
                }}
                onClick={({ clientX, clientY }) => {
                  const rect = el.current?.getBoundingClientRect();
                  const rectX = rect?.x || 0;
                  const rectY = rect?.y || 0;
                  const x = clientX - rectX;
                  const y = clientY - rectY;
                  setPoints({ x, y });
                  setIsOpen(true);
                }}
              >
                <div className="flex flex-col justify-center items-center h-full text-white text-sm">
                  <IconCamera size="2rem" />
                  <div>Tambah Grup Ikon</div>
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
                  <ContextMenuItem
                    icon={<IconUpload size="1rem" />}
                    text="Upload Foto"
                    color="blue"
                    onClick={() => {
                      refFile.current?.click();
                    }}
                  />
                </List>
              </Card>
            )}
          </Transition>
        </div>
      </div>
    </>
  );
}

function DrawerCreateGroup({ participants }: DrawerCreateGroupProps) {
  const dispatch = useAppDispatch();

  const { setConversationId } = useContext(SelectedChatListContext);
  const { popAll: closeAllStackDrawer } = useContext(DrawerNavigationStackContext);

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => {
        if (!value) return 'Nama grup tidak boleh kosong';
        return null;
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const { name } = form.values;
      const participantIds = participants.map((item) => item.user_id);
      const { data, message } = await dispatch(
        asyncCreateGroupConversation({
          name,
          participants: participantIds,
          avatar: selectedFile,
        }),
      ).unwrap();

      // Set selected chat list id
      setConversationId(data.id);

      // Close all stack drawer
      closeAllStackDrawer();

      notifications.show({
        title: 'Success',
        message,
        color: 'green',
      });
    } catch (error) {
      const result = errorHandler(error);

      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <DrawerHeader title="Kelompok Baru" />
      <div className="grow flex flex-col overflow-auto h-[0]">
        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <DrawerCreateGroupAvatar
            onSelectedImage={(file) => {
              setSelectedFile(file);
            }}
          />
          <div className="px-5">
            <TextInput placeholder="Nama Grup" label="Nama" withAsterisk {...form.getInputProps('name')} />
          </div>
          <div className="p-5">
            <Button type="submit" leftIcon={<IconDeviceFloppy size="1rem" />} className="w-full" loading={isLoading}>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DrawerCreateGroup;
