import React from 'react';
import { Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../session/TokenContextProvider';
import { GeneralTooltip } from '../util/GeneralTooltip';
import { useLoggedIn } from '../../hooks/useLoggedIn';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavigationButtons = () => {
  const { setToken } = React.useContext(TokenContext);
  const navigate = useNavigate();
  const SignedIn = useLoggedIn();

  const onClickSignOut = () => {
    setToken(null);
    navigate('/comments');
  };

  if (SignedIn) {
    return (
      <Box sx={{ ml: 'auto' }}>
        <GeneralTooltip title="Log out">
          <Button
            sx={{
              m: 1,
              width: 42,
              minWidth: 36,
            }}
            variant="contained"
            color="secondary"
            onClick={onClickSignOut}
          >
            <LogoutIcon color="primary" />
          </Button>
        </GeneralTooltip>
      </Box>
    );
  }

  return SignedIn ? (
    <Box sx={{ ml: 'auto' }}>
      <GeneralTooltip title="Log out">
        <Button
          sx={{
            m: 1,
            width: 42,
            minWidth: 36,
          }}
          variant="contained"
          color="secondary"
          onClick={onClickSignOut}
        >
          <LogoutIcon color="primary" />
        </Button>
      </GeneralTooltip>
    </Box>
  ) : (
    <Box sx={{ ml: 'auto' }}>
      <GeneralTooltip title="Log in">
        <Button sx={{ width: 42, minWidth: 36 }} variant="contained" component={Link} to={`/sign-in`} color="secondary">
          <LoginIcon color="primary" />
        </Button>
      </GeneralTooltip>
    </Box>
  );
};
