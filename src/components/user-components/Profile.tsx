import { Box, Typography, Grid, Avatar, Tabs, Tab, Fab } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import Placeholder from '../../images/DogPlaceholder.jpg';
import BannerPlaceholder from '../../images/wolf.jpg';
import SettingsIcon from '@mui/icons-material/Settings';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [tab, setTab] = React.useState(0);

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
          <Fab color="secondary" size="medium" component={Link} to={'/settings'} sx={{ position: 'absolute', right: 8, top: 72 }}>
            <SettingsIcon />
          </Fab>
          <Grid item xs={12} md={12}>
            <Box sx={{ width: '100%', height: 128 }}>
              <Box component="img" alt="Banner" src={BannerPlaceholder} sx={{ width: '100%', height: 128 , objectFit: 'cover'}} className=""/>
            </Box>
            <Avatar alt="Dog" src={ Placeholder } sx={{ width: 92, height: 92, ml: 2, mt: -4, border: 2, borderColor: 'background.default' }} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" align="left" sx={{ ml: 2, mb: 1, mt: 1 }}>
              Dog
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body2" align="left" sx={{ ml: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>11</Typography> Comments
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body2" align="left">
              <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>21</Typography> Likes
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Tabs value={tab} onChange={ChangeTab} centered sx={{ mt: 2, borderTop: 1, borderColor: 'primary.dark'}}>
              <Tab label="Comments" sx={{ width: '33%'}}/>
              <Tab label="Likes" sx={{ width: '33%'}}/>
              <Tab label="Top" sx={{ width: '33%'}}/>
            </Tabs>
            <TabPanel value={tab} index={0}>
              First panel
            </TabPanel>
            <TabPanel value={tab} index={1}>
              Second panel
            </TabPanel>
            <TabPanel value={tab} index={2}>
              Third panel
            </TabPanel>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile