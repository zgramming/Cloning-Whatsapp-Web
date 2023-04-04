import '@/styles/globals.css';

import { MantineProvider } from '@mantine/core';

import type { AppProps } from 'next/app';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import SelectedChatListProvider from '@/context/SelectedChatListContext';
import AuthProvider from '@/context/AuthContext';
import RouteTransition from '@/components/RouteTransition';
import { store } from '@/redux-toolkit/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
        <Notifications position="top-right" />
        <AuthProvider>
          <SelectedChatListProvider>
            <Component {...pageProps} />
          </SelectedChatListProvider>
        </AuthProvider>
      </MantineProvider>
    </Provider>
  );
}
