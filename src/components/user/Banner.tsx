import React from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useUserId } from '../../hooks/useUserId';
import { apiGetBanner, apiGetBannerUsername } from '../../util/apiCalls';
import { API_URL } from '../constants';

type BannerProps = {
  username?: string;
};

export const Banner = (props: BannerProps) => {
  const { username } = props;
  const [userId] = useUserId();
  const [received, setReceived] = React.useState(false);
  const [bannerUrl, setBannerUrl] = React.useState<string>();

  React.useLayoutEffect(() => {
    if (username) {
      setBannerUrl(`${API_URL}/Profile/banner/username/${username}`);
      apiGetBannerUsername(username).then(response => {
        if (response.data) setReceived(true);
      });
    } else {
      if (!userId) return;
      setBannerUrl(`${API_URL}/Profile/banner/id/${userId}`);
      apiGetBanner(userId).then(response => {
        if (response.data) setReceived(true);
      });
    }
  }, [userId, username]);

  return (
    <>
      {received ? (
        <Box component="img" alt="Banner" src={bannerUrl} sx={{ width: '100%', height: 128, objectFit: 'cover' }} />
      ) : (
        <Box component="canvas" sx={{ width: '100%', height: 128, objectFit: 'cover', backgroundColor: grey[500] }} />
      )}
    </>
  );
};
