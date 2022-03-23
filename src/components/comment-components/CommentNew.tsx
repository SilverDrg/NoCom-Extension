import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const CommentNew = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('comment'),
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
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
                autoComplete="comment"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Post
            </Button>
            <Grid container>
                <Grid item>
                    <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                        <Typography color="primary.dark" variant="body2">
                            {"Back to Sign in"}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
    </Container>
  );
}

export default CommentNew;