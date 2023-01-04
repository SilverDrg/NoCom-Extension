import React from 'react';
import { Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../session/TokenContextProvider';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavigationButtons = () => {
  const {token, setToken} = React.useContext(TokenContext);
  const [expired, setExpired] = React.useState<boolean>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(localStorage.getItem('expiration') !== null) {
      var expires = new Date(localStorage.getItem('expiration')!);
      var now = new Date();
      if(expires === null || expires < now) {
        setExpired(true)
        setToken(null)
      } else {
        setExpired(false)
      }
    }
  }, [setToken]);

  const SignedIn = token !== null;

  const onClickSignOut = () => {
    setToken(null)
    navigate('/comments')
  }
  
  if (SignedIn && !expired) {
    return (
      <Box sx={{ ml: "auto" }}>
        <Button sx={{ m: 1, width: 42, minWidth: 36}} variant="contained" color="secondary" onClick={onClickSignOut}>
            <LogoutIcon color="primary"/>
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ ml: "auto" }}>
      <Button sx={{ width: 42, minWidth: 36}} variant="contained" component={Link} to={`/sign-in`} color="secondary">
          <LoginIcon color="primary"/>
      </Button>
    </Box>
  );
};
