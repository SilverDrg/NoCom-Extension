import Logo from '../../images/Logo-white.png';
import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

import { NavigationButtons } from './NavigationButtons';

export const Navigation = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <AppBar position="sticky" sx={{ background: theme.palette.primary.main }}>
      <Toolbar>
        <Link to={'/home'}>
          <img src={Logo} alt="NoCom" width="80px" />
        </Link>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ marginleft: "auto", /*margin: "auto"*/ }} 
          textColor="secondary"
          indicatorColor="secondary" 
        >
          <Tab icon={<HomeIcon color="secondary" fontSize='large' />} aria-label="home" sx={{ width: 48, minWidth: 36 }} component={Link} to={`/home`}/>
          <Tab icon={<ChatIcon color="secondary" fontSize='large' />} aria-label="comments" sx={{ width: 48, minWidth: 36 }} component={Link} to={`/comments`}/>
        </Tabs>
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  );
};
