import { useContext } from 'react';
import { Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { TokenContext } from '../session-components/TokenContextProvider';
import { ColorModeContext } from '../session-components/ThemeContextProvider';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavigationButtons = () => {
  const {token, setToken} = useContext(TokenContext);
  const {mode, setMode} = useContext(ColorModeContext);
  const SignedIn = token !== null;

  const onClickToggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light')
  }
  
  if (SignedIn) {
    return (
      <Box sx={{ ml: "auto" }}>
        <IconButton sx={{ ml: 1, mr: 1, width: 42, minWidth: 36}} component={Link} to={`/profile`} color="primary">
            <AccountCircleIcon color="secondary" fontSize="large"/>
        </IconButton>
        <Button sx={{ m: 1, width: 42, minWidth: 36}} variant="contained" component={Link} to={`/log-out`} color="secondary">
            <LogoutIcon color="primary"/>
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ ml: "auto" }}>
      <IconButton sx={{ ml: 1, mr: 1, width: 42, minWidth: 36}} color="primary" onClick={onClickToggleMode}>
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Button sx={{ width: 42, minWidth: 36}} variant="contained" component={Link} to={`/sign-in`} color="secondary">
          <LoginIcon color="primary"/>
      </Button>
    </Box>
  );
};

export default NavigationButtons;