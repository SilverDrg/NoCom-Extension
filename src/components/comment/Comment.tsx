import { Grid, Paper, Typography, Checkbox } from '@mui/material'
import { pink } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react'

import { CommentModel } from '../../models/Comment';

export const Comment = (props: any) => {
  const [Like, setLike] = useState(false);
  const comment: CommentModel = props.comment;
  let isNSFW;

  const handleLike = () => {
    setLike((like) => !like);
  }

  if (comment.nsfw) {
    isNSFW = 
    <Grid item xs={3} md={3}>
      <Typography variant="button" color="red">NSFW</Typography>
    </Grid>;
  }

  return (
    <Paper elevation={3} sx={{ width: '100%', m: 1, mt: 0.5, mb: 1 }}>
        <Typography variant="body1" align="left" sx={{ m: 1, borderBottom: 1, borderColor: 'primary.main'}}>
            {comment.username}
        </Typography>
        <Typography variant="body2" align="left" sx={{ m: 1}}>
            {comment.content}
        </Typography>
        <Grid container>
          <Grid item container spacing={0} xs={9} md={9}>
            <Grid item xs={1} md={2} sx={{ ml: 1 }}>
              <Checkbox 
                icon={<FavoriteBorderIcon />} 
                checkedIcon={<FavoriteIcon />} 
                value="nsfw" 
                checked={Like} 
                onChange={handleLike} 
                size="small" 
                sx={{
                  color: 'primary',
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
            </Grid>
            <Grid item xs={3} md={0.5}>
              <Typography variant="body1" align="left" sx={{ p: 1, ml: 1 }} color={Like ? pink[500] : "" } >{comment.likes}</Typography>
            </Grid>
          </Grid>
          {isNSFW}
        </Grid>
    </Paper>
  )
}
