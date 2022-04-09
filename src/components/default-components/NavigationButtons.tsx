import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { TokenContext } from '../session-components/TokenContextProvider';

const NavigationButtons = () => {
  const {token, setToken} = useContext(TokenContext);
  const SignedIn = token !== null;
  
  if (SignedIn) {
    return (
        <>
            <Button sx={{ ml: "auto", width: 42, minWidth: 36}} variant="contained" component={Link} to={`/profile`} color="secondary">
                <AccountCircleIcon color="primary"/>
            </Button>
            <Button sx={{ ml: "auto", width: 42, minWidth: 36}} variant="contained" component={Link} to={`/log-out`} color="secondary">
                <LogoutIcon color="primary"/>
            </Button>
        </>
      );
  }

  return (
    <Button sx={{ ml: "auto", width: 42, minWidth: 36}} variant="contained" component={Link} to={`/sign-in`} color="secondary">
        <LoginIcon color="primary"/>
    </Button>
  );
};

export default NavigationButtons;