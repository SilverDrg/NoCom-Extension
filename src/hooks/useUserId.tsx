import React from 'react';
import { TokenContext } from '../components/session/TokenContextProvider';

export const useUserId = (): [string | null] => {
  const { token } = React.useContext(TokenContext);
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!token) setUserId(null);
    const userId = localStorage.getItem('userId');
    if (!userId && userId !== '') setUserId(null);
    else setUserId(userId);
  }, [token]);

  return [userId];
};
