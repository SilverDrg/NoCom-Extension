import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Avatar, Tabs, Tab, Fab } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Comments } from '../comment/Comments';
import { apiFetchUserComments, apiFetchUserLikes, apiGetProfile } from '../../util/apiCalls';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { defaultProfile, ProfileModel } from '../../models/Profile';

import Placeholder from '../../images/DogPlaceholder.jpg';
import BannerPlaceholder from '../../images/wolf.jpg';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

type ProfileProps = {
  userId: string | null;
};

export const Profile = (props: ProfileProps) => {
  const { userId } = props;
  const { mode } = React.useContext(ColorModeContext);
  const [tab, setTab] = React.useState(0);
  const [profile, setProfile] = React.useState<ProfileModel>(defaultProfile);

  React.useLayoutEffect(() => {
    if (!userId) return;
    apiGetProfile(userId).then(response => {
      console.log(response.data);
      const profileData = response.data as ProfileModel;
      setProfile(profileData);
    });
  }, [userId]);

  const ChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
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
      <Grid container sx={{ p: 0, m: 0 }}>
        <Grid item container>
          <Grid item xs={12} md={12}>
            <Box sx={{ width: '100%', height: 128 }}>
              <Box
                component="img"
                alt="Banner"
                src={BannerPlaceholder}
                sx={{ width: '100%', height: 128, objectFit: 'cover' }}
                className=""
              />
            </Box>
            <Avatar
              alt="Dog"
              src={Placeholder}
              sx={{
                width: 92,
                height: 92,
                ml: 2,
                mt: -4,
                border: 2,
                borderColor: 'background.default',
              }}
            />
            <Fab
              color="secondary"
              size="medium"
              component={Link}
              to={'/settings/profile'}
              sx={{ position: 'absolute', right: 10, top: 198 }}
            >
              <SettingsIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" align="left" sx={{ ml: 2, mb: 1, mt: 1 }}>
              {profile.username}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body2" align="left" sx={{ ml: 2 }}>
              <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', display: 'inline' }}>
                {profile.comments}
              </Typography>{' '}
              Comments
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body2" align="left">
              <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', display: 'inline' }}>
                {profile.likes}
              </Typography>{' '}
              Likes
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            textColor={mode === 'light' ? 'primary' : 'secondary'}
            indicatorColor={mode === 'light' ? 'primary' : 'secondary'}
            value={tab}
            onChange={ChangeTab}
            centered
            sx={{ mt: 2, borderTop: 1, borderColor: 'primary', backgroundColor: 'primary' }}
          >
            <Tab label="Comments" sx={{ width: '33%' }} />
            <Tab label="Top" sx={{ width: '33%' }} />
            <Tab label="Likes" sx={{ width: '33%' }} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <Comments sortBy="new" showFilter={false} apiFetch={apiFetchUserComments} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Comments sortBy="top" showFilter={false} apiFetch={apiFetchUserComments} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Comments sortBy="new" showFilter={false} apiFetch={apiFetchUserLikes} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
