import { useContext } from 'react';
import { Button, IconButton, Box } from '@mui/material';
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
      <Button sx={{ width: 42, minWidth: 36}} variant="contained" component={Link} to={`/sign-in`} color="secondary">
          <LoginIcon color="primary"/>
      </Button>
    </Box>
  );
};

export default NavigationButtons;