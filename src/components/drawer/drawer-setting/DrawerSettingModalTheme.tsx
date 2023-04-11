import { Modal, Radio, useMantineColorScheme } from '@mantine/core';

type DrawerSettingModalThemeProps = {
  isOpenModalTheme: boolean;
  closeModalTheme: () => void;
};
function DrawerSettingModalTheme({ closeModalTheme, isOpenModalTheme }: DrawerSettingModalThemeProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Modal opened={isOpenModalTheme} onClose={closeModalTheme} title="Tema" centered>
      <div className="flex flex-col gap-5">
        <Radio.Group
          className="flex flex-col gap-5"
          defaultValue={colorScheme}
          onChange={(e) => {
            toggleColorScheme(e as 'light' | 'dark');
          }}
        >
          <Radio label="Light" size="xs" value="light" />
          <Radio label="Dark" size="xs" value="dark" />
        </Radio.Group>
      </div>
    </Modal>
  );
}

export default DrawerSettingModalTheme;
