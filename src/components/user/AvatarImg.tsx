import React from 'react';
import { Avatar } from '@mui/material';
import { useUserId } from '../../hooks/useUserId';
import { API_URL } from '../constants';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type AvatarImgProps = {
  username?: string;
  settings?: boolean;
};

export const AvatarImg = (props: AvatarImgProps) => {
  const { username, settings = false } = props;
  const [userId] = useUserId();
  const [avatar, setAvatar] = React.useState<string>();

  const settingsAvatar = {
    width: 88,
    height: 88,
    '&:hover': {
      filter: 'blur(0.5px) brightness(0.75)',
    },
  };

  const profileAvatar = {
    width: 92,
    height: 92,
    ml: 2,
    mt: -4,
    border: 2,
    borderColor: 'background.default',
  };

  React.useLayoutEffect(() => {
    if (username) {
      setAvatar(`${API_URL}/Profile/avatar/username/${username}`);
    } else {
      if (!userId) return;
      setAvatar(`${API_URL}/Profile/avatar/id/${userId}`);
    }
  }, [username, userId]);

  return avatar ? (
    <Avatar
      alt="Profile avatar"
      srcSet={avatar}
      sx={{
        ...(!settings && profileAvatar),
        ...(settings && settingsAvatar),
      }}
    />
  ) : (
    <Avatar
      alt="Profile avatar"
      sx={{
        ...(!settings && profileAvatar),
        ...(settings && settingsAvatar),
      }}
    >
      <AccountCircleIcon color="secondary" sx={{ fontSize: 106 }} />
    </Avatar>
  );
};
