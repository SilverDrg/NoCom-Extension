import { Grid, Paper, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'

const Comment = (props: any) => {
  const user = props.user;
  let isNSFW;
  if (user.nsfw === "true") {
    isNSFW = 
    <Grid item xs={3} md={3}>
      <Typography variant="button" color="red">NSFW</Typography>
    </Grid>;
  }
  return (
    <Paper elevation={3} sx={{ m: 1, width: '90%'}}>
        <Typography variant="body1" align="left" sx={{ m: 1, borderBottom: 1, borderColor: 'primary.main'}}>
            {user.username}
        </Typography>
        <Typography variant="body2" align="left" sx={{ m: 1}}>
            {user.comment}
        </Typography>
        <Grid container>
          <Grid item container spacing={0} xs={9} md={9}>
            <Grid item xs={3} md={3}>
              <FavoriteBorderIcon/>
            </Grid>
            <Grid item xs={3} md={0.5}>
              {user.likes}
            </Grid>
          </Grid>
          {isNSFW}
        </Grid>
    </Paper>
  )
}

export default Comment