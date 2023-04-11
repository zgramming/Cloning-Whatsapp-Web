import '@/styles/globals.css';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import RouteTransition from '@/components/RouteTransition';
import ApplicationConfigProvider from '@/context/ApplicationConfigContext';
import AuthProvider from '@/context/AuthContext';
import MantineCustomProvider from '@/context/MantineCustomContext';
import SelectedChatListProvider from '@/context/SelectedChatListContext';
import SocketIOProvider from '@/context/SocketIOContext';
import { store } from '@/redux-toolkit/store';

export default function App({ Component, pageProps }: AppProps) {
  const { replace } = useRouter();

  useEffect(() => {
    const mobileViewSize = 768;

    if (typeof window !== 'undefined' && window.innerWidth < mobileViewSize) {
      replace('/unsupport');
    }

    return () => {};
  }, [replace]);

  return (
    <Provider store={store}>
      <ApplicationConfigProvider>
        <MantineCustomProvider>
          <RouteTransition />
          <Notifications position="top-right" />
          <SocketIOProvider>
            <AuthProvider>
              <SelectedChatListProvider>
                <Component {...pageProps} />
              </SelectedChatListProvider>
            </AuthProvider>
          </SocketIOProvider>
        </MantineCustomProvider>
      </ApplicationConfigProvider>
    </Provider>
  );
}
