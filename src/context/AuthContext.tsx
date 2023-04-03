import { createContext, useState } from 'react';

import { UserInterface } from '@/interface/user.interface';

type ContextType = {
  user: UserInterface | undefined;
  setUser: (val: UserInterface | undefined) => void;
};

const defaultValue: ContextType = {
  user: undefined,
  setUser: (val) => {},
};

export const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserInterface | undefined>();

  const onUserHandler = (val: UserInterface | undefined) => {
    setUser(val);
  };

  return <AuthContext.Provider value={{ user, setUser: onUserHandler }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
