import '@/styles/globals.css';

import RouteTransition from '@/components/RouteTransition';
import AuthProvider from '@/context/AuthContext';
import SelectedChatListProvider from '@/context/SelectedChatListContext';
import { MantineProvider } from '@mantine/core';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
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
      <RouteTransition />
      <AuthProvider>
        <SelectedChatListProvider>
          <Component {...pageProps} />
        </SelectedChatListProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
