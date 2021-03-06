import * as React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, FormControlLabel, Checkbox } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useNavigate } from 'react-router-dom';

const CommentNew = () => {
    const [Anonymous, setAnonymous] = useState(false);
    const [Nsfw, setNsfw] = useState(false);
    const [Website, setWebsite] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            setWebsite(tabs[0].url);
        });

        console.log(Website);
    }, [Website]);

    const handleAnonymous = () => {
        setAnonymous(!Anonymous);
    }

    const handleNsfw = () => {
        setNsfw(!Nsfw);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
              setWebsite(tabs[0].url)
          })
        const data = new FormData(event.currentTarget);
        console.log({
            content: data.get('comment'),
            anonymous: Anonymous,
            nsfw: Nsfw,
            website: Website
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
                    autoComplete="comment"
                    autoFocus
                />
                <FormControlLabel
                    control={<Checkbox value="anonymous" checked={Anonymous} onChange={handleAnonymous} color="primary" />}
                    label="Anonymous"
                />
                <FormControlLabel
                    control={<Checkbox value="nsfw" checked={Nsfw} onChange={handleNsfw} color="primary" />}
                    label="Nsfw"
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
                        <Link to="/" onClick={() => navigate(-1)} style={{ textDecoration: 'none' }}>
                            <Typography color="primary.dark" variant="body2">
                                {"Back"}
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