import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { mutate } from 'swr';
import api from '../services/api';

interface AuthState {
  logged: boolean;
}

interface SignInCredentials {
  password: string;
}

interface AuthContextData {
  logged: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const isLogged = localStorage.getItem('@AGF-BI:logged');
      const fatMFs = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0510&ano=2019,%202020`,
      );
      const fatRomp = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0010&ano=2019,%202020`,
      );
      const fatGer = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0500&ano=2019,%202020`,
      );
      const fatOutros = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020`,
      );
      const opCosts = localStorage.getItem(
        `@AGF-BI:op-costs?filial=0101&ano=2019,%202020&grupo=0080,%200094,%200500,%200501,%200502,%200503,%200510,%200520,%200540,%200550,%200560,%200570`,
      );
      if (isLogged) {
        setLogged({ logged: JSON.parse(isLogged) });
      }

      if (fatMFs) {
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020',
          JSON.parse(fatMFs),
        );
      } else {
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020',
          api.get('fat?filial=0101&grupo=0510&ano=2019,%202020').then(res => {
            localStorage.setItem(
              `@AGF-BI:fat?filial=0101&grupo=0510&ano=2019,%202020`,
              JSON.stringify(res.data),
            );
            return res.data;
          }),
        );
      }

      if (fatRomp) {
        await mutate(
          'fat?filial=0101&grupo=0010&ano=2019,%202020',
          JSON.parse(fatRomp),
        );
      } else {
        await mutate(
          'fat?filial=0101&grupo=0010&ano=2019,%202020',
          api.get('fat?filial=0101&grupo=0010&ano=2019,%202020').then(res => {
            localStorage.setItem(
              `@AGF-BI:fat?filial=0101&grupo=0010&ano=2019,%202020`,
              JSON.stringify(res.data),
            );
            return res.data;
          }),
        );
      }

      if (fatGer) {
        await mutate(
          'fat?filial=0101&grupo=0500&ano=2019,%202020',
          JSON.parse(fatGer),
        );
      } else {
        await mutate(
          'fat?filial=0101&grupo=0500&ano=2019,%202020',
          api
            .get('fat?filial=0101&grupo=0500&ano=2019,%202020')
            .then(res => res.data),
        );
      }

      if (fatOutros) {
        await mutate(
          'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020',
          JSON.parse(fatOutros),
        );
      } else {
        await mutate(
          'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020',
          api
            .get(
              'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020',
            )
            .then(res => res.data),
        );
      }

      if (opCosts) {
        await mutate(
          'op-costs?filial=0101&ano=2019,%202020&grupo=0080,%200094,%200500,%200501,%200502,%200503,%200510,%200520,%200540,%200550,%200560,%200570',
          JSON.parse(opCosts),
        );
      } else {
        await mutate(
          'op-costs?filial=0101&ano=2019,%202020&grupo=0080,%200094,%200500,%200501,%200502,%200503,%200510,%200520,%200540,%200550,%200560,%200570',
          api
            .get(
              'op-costs?filial=0101&ano=2019,%202020&grupo=0080,%200094,%200500,%200501,%200502,%200503,%200510,%200520,%200540,%200550,%200560,%200570',
            )
            .then(res => res.data),
        );
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ password }) => {
    if (password !== '!agf123#') {
      setLogged({ logged: false });
      throw Error('Senha incorreta');
    }

    localStorage.setItem('@AGF-BI:logged', JSON.stringify(true));

    setLogged({ logged: true });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AGF-BI:token');
    localStorage.removeItem('@AGF-BI:user');

    setLogged({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ logged: logged.logged, signIn, signOut, loading }}
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
