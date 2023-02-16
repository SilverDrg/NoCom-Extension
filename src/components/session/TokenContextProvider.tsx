import React, { useState, useMemo } from 'react';

interface TokenInformation {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const TokenContext = React.createContext<TokenInformation>({
  token: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setToken: (token: string | null) => {},
});

const TokenContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const value = useMemo<TokenInformation>(() => {
    return {
      token,
      setToken: (token: string | null) => {
        const expirationString = localStorage.getItem('expiration');

        if (!expirationString) setToken(null);
        else {
          const expiration = new Date(expirationString);
          const currentDate = new Date(Date.now());

          if (expiration < currentDate) {
            setToken(null);
            removeTokenStorage();
          } else {
            setToken(token);

            if (token !== null) {
              localStorage.setItem('token', token);
            } else {
              removeTokenStorage();
            }
          }
        }
      },
    };
  }, [token]);

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

const removeTokenStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiration');
};

export default TokenContextProvider;
