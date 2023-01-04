import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Tabs, Tab, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { TokenContext } from '../session/TokenContextProvider';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { NavigationButtons } from './NavigationButtons';

export const Navigation = () => {
  const {token, setToken} = React.useContext(TokenContext);
  const {mode, setMode} = React.useContext(ColorModeContext);
  const [value, setValue] = React.useState(1);
  const [expired, setExpired] = React.useState<boolean>();
  const theme = useTheme();

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

  const onClickToggleMode = () => {
    if(mode === 'light') { 
      setMode('dark')
      localStorage.setItem('theme', 'dark');
    } else { 
      setMode('light')
      localStorage.setItem('theme', 'light');
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <AppBar position="sticky" sx={{ background: theme.palette.primary.main }}>
      <Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ marginleft: "auto" }} 
          textColor="secondary"
          indicatorColor="secondary" 
        >
          <Tab icon={<HomeIcon color="secondary" fontSize='large' />} aria-label="home" sx={{ minWidth: 36 }} component={Link} to={`/home`}/>
          <Tab icon={<ChatIcon color="secondary" fontSize='large' />} aria-label="comments" sx={{ minWidth: 36 }} component={Link} to={`/comments`}/>
          {SignedIn && !expired && <Tab icon={<AccountCircleIcon color="secondary" fontSize="large"/>} aria-label="comments" sx={{ minWidth: 36 }} component={Link} to={`/profile`}/>}
        </Tabs>
        <IconButton sx={{ ml: 1, mr: 1, width: 42, minWidth: 36}} color="secondary" onClick={onClickToggleMode}>
          {mode === 'dark' ? <DarkModeIcon fontSize="large" /> : <LightModeIcon fontSize="large" />}
        </IconButton>
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  );
};
