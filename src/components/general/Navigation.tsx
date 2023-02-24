import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Tabs, Tab, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { ColorModeContext } from '../session/ThemeContextProvider';
import { NavigationButtons } from './NavigationButtons';
import { GeneralTooltip } from '../util/GeneralTooltip';
import { useLoggedIn } from '../../hooks/useLoggedIn';

export const Navigation = () => {
  const { mode, setMode } = React.useContext(ColorModeContext);
  const [value, setValue] = React.useState(1);
  const theme = useTheme();
  const SignedIn = useLoggedIn();

  const onClickToggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setMode('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky" sx={{ background: theme.palette.primary.main }}>
      <Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ marginleft: 'auto' }}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            icon={
              <GeneralTooltip title="Home">
                <HomeIcon color="secondary" fontSize="large" />
              </GeneralTooltip>
            }
            aria-label="home"
            sx={{ minWidth: 36 }}
            component={Link}
            to={`/home`}
          />
          <Tab
            icon={
              <GeneralTooltip title="Comments">
                <ChatIcon color="secondary" fontSize="large" />
              </GeneralTooltip>
            }
            aria-label="comments"
            sx={{ minWidth: 36 }}
            component={Link}
            to={`/comments`}
          />
          {SignedIn && (
            <Tab
              icon={
                <GeneralTooltip title="Profile">
                  <AccountCircleIcon color="secondary" fontSize="large" />
                </GeneralTooltip>
              }
              aria-label="comments"
              sx={{ minWidth: 36 }}
              component={Link}
              to={`/profile`}
            />
          )}
        </Tabs>
        <GeneralTooltip title="Theme">
          <IconButton sx={{ ml: 1, mr: 1, width: 51, minWidth: 36 }} color="secondary" onClick={onClickToggleMode}>
            {mode === 'dark' ? <DarkModeIcon fontSize="large" /> : <LightModeIcon fontSize="large" />}
          </IconButton>
        </GeneralTooltip>
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  );
};
