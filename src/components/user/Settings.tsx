import React from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import { AvatarDialog } from './AvatarDialog';

import Placeholder from '../../images/DogPlaceholder.jpg';
import BannerPlaceholder from '../../images/wolf.jpg';

export const Settings = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpenDialog = React.useCallback(() => {
    setOpenDialog(true);
  }, []);

  return (
    <Box
      sx={{
        marginTop: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AvatarDialog open={openDialog} onClose={handleCloseDialog} />
      <Grid container sx={{ p: 0, m: 0 }}>
        <Grid item container sx={{ alignContent: 'flex-start' }}>
          <Grid item xs={12} md={12} sx={{ display: 'grid' }}>
            <Box sx={{ width: '100%', height: 128 }}>
              <Box
                component="img"
                alt="Banner"
                src={BannerPlaceholder}
                sx={{ width: '100%', height: 128, objectFit: 'cover' }}
                className=""
              />
            </Box>
            <Button
              onClick={handleOpenDialog}
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
              <Avatar
                alt="Dog"
                src={Placeholder}
                sx={{
                  width: 88,
                  height: 88,
                  '&:hover': {
                    filter: 'blur(0.5px) brightness(0.75)',
                  },
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" align="left" sx={{ ml: 2, mb: 1, mt: 1 }}>
              Dog
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
