import { getCookie } from 'cookies-next';
import { createContext, useEffect, useMemo, useState } from 'react';

import { UserInterface } from '@/interface/user/user.interface';
import { KEY_COOKIES_USER } from '@/utils/constant';

type ContextType = {
  user: UserInterface | undefined;
  setUser: (val: UserInterface | undefined) => void;
};

const defaultValue: ContextType = {
  user: undefined,
  setUser: () => {},
};

export const AuthContext = createContext(defaultValue);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserInterface | undefined>();

  const onSetUser = (val: UserInterface | undefined) => {
    setUser(val);
  };

  useEffect(() => {
    const cookie = getCookie(KEY_COOKIES_USER);

    try {
      setUser(JSON.parse(cookie as string));
    } catch (error) {
      setUser(undefined);
    }
    return () => {};
  }, []);

  const value: ContextType = useMemo(() => ({ user, setUser: onSetUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
