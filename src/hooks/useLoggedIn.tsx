import React from 'react';
import { TokenContext } from '../components/session/TokenContextProvider';

export const useLoggedIn = (): [boolean] => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const { token } = React.useContext(TokenContext);

    React.useEffect(() => {
        if (!token) return;
        setIsLoggedIn(true);
    }, [setIsLoggedIn, token]);

    return [isLoggedIn];
}