import React from 'react';
import { TokenContext } from '../components/session/TokenContextProvider';

export const useLoggedIn = (): boolean => {
  const { token } = React.useContext(TokenContext);
  return !!token;
};
