import React from 'react';
import { TokenContext } from '../components/session/TokenContextProvider';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const useLoggedIn = (): boolean => {
  const { token } = React.useContext(TokenContext);

  const checkTokenState = React.useMemo(() => {
    if (!token) return false;

    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return false;
    }

    const expiration = new Date(decoded.exp * 1000);
    const currentDate = new Date(Date.now());

    return expiration > currentDate;
  }, [token]);

  return checkTokenState;
};
