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
        setToken(token);
        if (token !== null) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      },
    };
  }, [token]);

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export default TokenContextProvider;
