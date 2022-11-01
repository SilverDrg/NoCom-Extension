import { useContext, useState, useEffect } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../session/TokenContextProvider';
import { ColorModeContext } from '../session/ThemeContextProvider';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const NavigationButtons = () => {
  const {token, setToken} = useContext(TokenContext);
  const {mode, setMode} = useContext(ColorModeContext);
  const [expired, setExpired] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
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

  const onClickToggleMode = () => {
    if(mode === 'light') { 
      setMode('dark')
      localStorage.setItem('theme', 'dark');
    } else { 
      setMode('light')
      localStorage.setItem('theme', 'light');
    }
  }

  const onClickSignOut = () => {
    setToken(null)
    navigate('/comments')
  }
  
  if (SignedIn && !expired) {
    return (
      <Box sx={{ ml: "auto" }}>
        <IconButton sx={{ ml: 1, mr: 1, width: 42, minWidth: 36}} component={Link} to={`/profile`} color="primary">
            <AccountCircleIcon color="secondary" fontSize="large"/>
        </IconButton>
        <Button sx={{ m: 1, width: 42, minWidth: 36}} variant="contained" color="secondary" onClick={onClickSignOut}>
            <LogoutIcon color="primary"/>
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ ml: "auto" }}>
      <IconButton sx={{ ml: 1, mr: 1, width: 42, minWidth: 36}} color="secondary" onClick={onClickToggleMode}>
        {mode === 'dark' ? <DarkModeIcon fontSize="large" /> : <LightModeIcon fontSize="large" />}
      </IconButton>
      <Button sx={{ width: 42, minWidth: 36}} variant="contained" component={Link} to={`/sign-in`} color="secondary">
          <LoginIcon color="primary"/>
      </Button>
    </Box>
  );
};
