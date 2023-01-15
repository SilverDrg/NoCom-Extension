import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Button, TextField, Grid, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { TokenContext } from "../session/TokenContextProvider";
import { apiSignIn } from "../../util/apiCalls";

export const SignIn = () => {
  const { setToken } = React.useContext(TokenContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    apiSignIn({
      Username: data.get("username") as string,
      Password: data.get("password") as string,
    }).then((response) => {
      setToken(response.data.token);
      localStorage.setItem("expiration", response.data.expiration);
      localStorage.setItem("userId", response.data.userId);
      if (response.data.token) {
        navigate("/comments");
      }
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='dense'
            size='small'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='dense'
            size='small'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgot-pass' style={{ textDecoration: "none" }}>
                <Typography color='primary.dark' variant='body2'>
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to='/sign-up' style={{ textDecoration: "none" }}>
                <Typography color='primary.dark' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
