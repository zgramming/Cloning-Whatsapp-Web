import { createContext, useState } from 'react';

interface User {
  id: number;
  name: string;
}

type ContextType = {
  user: User | null;
  setUser: (val: User | null) => void;
};

const defaultValue: ContextType = {
  user: null,
  setUser: (val) => {},
};

export const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: 'Zeffry Reynando',
  });

  const onUserHandler = (val: User | null) => {
    setUser(val);
  };

  return <AuthContext.Provider value={{ user, setUser: onUserHandler }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
