import { useEffect } from 'react';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function MantineCustomProvider({ children }: any) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const changeHTMLTheme = (value: ColorScheme) => {
    const parentHTML = document.querySelector('#html-parent');

    if (parentHTML) {
      if (value === 'dark') {
        parentHTML.classList.add('dark');
      } else {
        parentHTML.classList.remove('dark');
      }
    }
  };

  const toggleColorScheme = (value?: ColorScheme) => {
    const val = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(val);

    changeHTMLTheme(val);
  };

  useEffect(() => {
    changeHTMLTheme(colorScheme);
    return () => {};
  }, [colorScheme]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: 'Noto Sans, sans-serif',
          headings: {
            fontFamily: 'Noto Sans, sans-serif',
          },
          colors: {
            brand: [
              '#e9fbf0',
              '#bef4d2',
              '#93ecb4',
              '#67e496',
              '#3cdd78',
              '#22c35e',
              '#1b9849',
              '#136c34',
              '#0b411f',
              '#04160a',
            ],
          },
          primaryColor: 'brand',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MantineCustomProvider;
