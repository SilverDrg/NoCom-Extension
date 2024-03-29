import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { AvatarDialog } from './AvatarDialog';
import { BannerDialog } from './BannerDialog';
import { Banner } from './Banner';
import { AvatarImg } from './AvatarImg';
import { GeneralTooltip } from '../util/GeneralTooltip';
import { BackButton } from '../util/BackButton';
import { apiGetProfile } from '../../util/apiCalls';
import { useUserId } from '../../hooks/useUserId';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { ProfileModel } from '../../models/Profile';

export const Settings = () => {
  const [openAvatarDialog, setOpenAvatarDialog] = React.useState(false);
  const [openBannerDialog, setOpenBannerDialog] = React.useState(false);
  const [profile, setProfile] = React.useState<ProfileModel>();
  const { mode } = React.useContext(ColorModeContext);
  const [userId] = useUserId();

  React.useLayoutEffect(() => {
    if (!userId) return;
    apiGetProfile(userId).then(response => {
      const profileData = response.data as ProfileModel;
      setProfile(profileData);
    });
  }, [userId]);

  const handleCloseDialog = React.useCallback(() => {
    setOpenAvatarDialog(false);
    setOpenBannerDialog(false);
  }, []);

  const handleApplyCloseDialog = React.useCallback(() => {
    setOpenAvatarDialog(false);
    setOpenBannerDialog(false);
  }, []);

  const handleOpenAvatarDialog = React.useCallback(() => {
    setOpenAvatarDialog(true);
  }, []);

  const handleOpenBannerDialog = React.useCallback(() => {
    setOpenBannerDialog(true);
  }, []);

  return (
    <Box
      sx={{
        marginTop: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '300px',
      }}
    >
      <AvatarDialog open={openAvatarDialog} onClose={handleCloseDialog} onCloseApply={handleApplyCloseDialog} />
      <BannerDialog open={openBannerDialog} onClose={handleCloseDialog} onCloseApply={handleApplyCloseDialog} />
      <Grid container sx={{ p: 0, m: 0 }}>
        <Grid item container sx={{ alignContent: 'flex-start' }}>
          <Grid item xs={12} md={12} sx={{ display: 'grid' }}>
            <Box>
              <BackButton btnSize="small" absolute />
              <GeneralTooltip title="Update banner">
                <Button
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: 200,
                    '&.MuiButton-outlined': {
                      border: 2,
                      fontWeight: 'bold',
                      borderRadius: 5,
                    },
                  }}
                  variant="outlined"
                  onClick={handleOpenBannerDialog}
                  color={mode === 'light' ? 'primary' : 'secondary'}
                  size="small"
                >
                  Update banner
                </Button>
              </GeneralTooltip>
            </Box>
            <Box sx={{ width: '100%', height: 128 }}>
              <Banner />
            </Box>
            <GeneralTooltip title="Update avatar">
              <Button
                onClick={handleOpenAvatarDialog}
                sx={{
                  width: 92,
                  height: 92,
                  ml: 2,
                  mt: -4,
                  border: 2,
                  borderRadius: 12,
                  borderColor: 'background.default',
                }}
              >
                <AvatarImg settings />
              </Button>
            </GeneralTooltip>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" align="left" sx={{ ml: 2, mb: 1, mt: 1 }}>
              {profile?.username}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
