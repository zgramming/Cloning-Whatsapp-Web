import { getCookie, setCookie } from 'cookies-next';
import { createContext, ReactNode, useMemo, useState } from 'react';

import { KEY_COOKIES_CHAT_WALLPAPPER } from '@/utils/constant';

type ApplicationConfigProviderProps = {
  children: ReactNode;
};

type ContextType = {
  chatWallpaperColor: string;
  setChatWallpaperColor: (val: string) => void;
};

const defaultValue: ContextType = {
  chatWallpaperColor: '#fff',
  setChatWallpaperColor: () => {},
};

export const ApplicationConfigContext = createContext(defaultValue);

function ApplicationConfigProvider({ children }: ApplicationConfigProviderProps) {
  const defaultChatWalpapper = getCookie(KEY_COOKIES_CHAT_WALLPAPPER) as string;

  // const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const [chatWallpaperColor, setChatWallpaperColor] = useState<string>(defaultChatWalpapper);

  const value: ContextType = useMemo(
    () => ({
      chatWallpaperColor,
      setChatWallpaperColor: (val) => {
        setChatWallpaperColor(val);
        setCookie(KEY_COOKIES_CHAT_WALLPAPPER, val, { path: '/' });
      },
    }),
    [chatWallpaperColor],
  );

  return <ApplicationConfigContext.Provider value={value}>{children}</ApplicationConfigContext.Provider>;
}

export default ApplicationConfigProvider;
