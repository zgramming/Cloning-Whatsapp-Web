import { createContext, useEffect, useMemo, useState } from 'react';

import { getCookie } from 'cookies-next';
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

  const onUserHandler = (val: UserInterface | undefined) => {
    setUser(val);
  };

  useEffect(() => {
    const cookie = getCookie(KEY_COOKIES_USER);

    try {
      if (cookie) setUser(JSON.parse(cookie as string));
    } catch (error) {
      setUser(undefined);
    }

    return () => {};
  }, []);

  const value = useMemo(() => ({ user, setUser: onUserHandler }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
