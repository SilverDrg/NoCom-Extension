import { Box, Typography, Grid, Avatar, Fab } from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext } from '../session-components/ThemeContextProvider';

import Placeholder from '../../images/DogPlaceholder.jpg';
import BannerPlaceholder from '../../images/wolf.jpg';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Settings = () => {
    const {mode, setMode} = useContext(ColorModeContext);

    const onClickToggleMode = () => {
        if(mode === 'light') { 
            setMode('dark')
            localStorage.setItem('theme', 'dark');
        } else { 
            setMode('light')
            localStorage.setItem('theme', 'light');
        }
      }

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
            <Fab color="secondary" size="medium" sx={{ position: 'absolute', right: 8, top: 72 }} onClick={onClickToggleMode}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
            </Grid>
        </Grid>
        </Box>
    )
}

export default Settings