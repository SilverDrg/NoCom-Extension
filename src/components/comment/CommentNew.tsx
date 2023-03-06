import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import { TokenContext } from '../session/TokenContextProvider';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { apiPostComment } from '../../util/apiCalls';
import { useWebsiteUrl } from '../../hooks/useWebsiteUrl';

export const CommentNew = () => {
  const { mode } = React.useContext(ColorModeContext);
  const { token } = React.useContext(TokenContext);
  const [nsfw, setNsfw] = React.useState(false);
  const [website, updateWebsite] = useWebsiteUrl();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();

  const handleNsfw = () => {
    setNsfw(!nsfw);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateWebsite();
    const data = new FormData(event.currentTarget);
    if (!data.get('comment') || data.get('comment') === '') return;
    const newComment = {
      content: data.get('comment') as string,
      nsfw: nsfw,
      website: website ?? '',
      userId: localStorage.getItem('userId'),
      replyId: params.id,
    };
    console.log('new comment: ', newComment);
    apiPostComment(token, {
      content: data.get('comment') as string,
      nsfw: nsfw,
      website: website ?? '',
      userId: localStorage.getItem('userId'),
      replyId: params.id,
    })
      .then(response => {
        if (response.status === 200) navigate('/comments');
      })
      .then(response => {
        console.log(response);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
          <ChatIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Post a new comment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '96%', mt: 1 }}>
          <TextField
            variant="filled"
            margin="dense"
            size="small"
            multiline
            required
            fullWidth
            rows={4}
            id="comment"
            label="New comment"
            name="comment"
            autoFocus
          />
          <FormControlLabel
            control={
              <Checkbox
                value="nsfw"
                checked={nsfw}
                onChange={handleNsfw}
                color="primary"
                sx={{
                  color: 'secondary',
                  '&.Mui-checked': {
                    color: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light,
                  },
                }}
              />
            }
            label="Nsfw"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={mode === 'light' ? 'primary' : 'secondary'}
            sx={{ mt: 3, mb: 2 }}
          >
            Post
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/" onClick={() => navigate(-1)} style={{ textDecoration: 'none' }}>
                <Typography color={mode === 'light' ? 'primary' : 'secondary.light'} variant="body2">
                  {'Back'}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
