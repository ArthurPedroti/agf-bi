import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { mutate } from 'swr';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = localStorage.getItem('@AGF-BI:token');
      const user = localStorage.getItem('@AGF-BI:user');
      const fatMFs = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0510&ano=2019,%202020`,
      );
      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user: JSON.parse(user) });
      }

      if (fatMFs) {
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020',
          JSON.parse(fatMFs),
        );
      } else {
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020',
          api
            .get('fat?filial=0101&grupo=0510&ano=2019,%202020')
            .then(res => res.data),
        );
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@AGF-BI:token', token);
    localStorage.setItem('@AGF-BI:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AGF-BI:token');
    localStorage.removeItem('@AGF-BI:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@AGF-BI:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
