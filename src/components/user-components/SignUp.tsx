import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import validator from 'validator'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import Constants from '../constants.json'

interface errorMessage {
    usernameUnavailable: string,
    usernameError: string,
    emailError: string,
    passwordError: string,
    matchingError: string
}

const SignUp = () => {
    const [invalidForm, setInvalidForm] = useState<errorMessage>({usernameUnavailable: '', usernameError: '', emailError: '', passwordError: '', matchingError: ''} as errorMessage);
    const [password, setPassword] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Check if the username is taken
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        console.log(searchTerm)
        if(searchTerm !== '') {
            Axios.get(Constants.API_URL + '/Account/Username/' + searchTerm)
                .then(response => {
                    if(response.data === 'taken') {
                        setInvalidForm(invalidForm => ({...invalidForm, usernameUnavailable: 'Username is already taken'}));
                    } else {
                        setInvalidForm(invalidForm => ({...invalidForm, usernameUnavailable: ''}));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
      }, 3000)
  
      return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    //Validate the inputs given to the TextField
    const validateUsername = (value: string) => {
        if (!(value === '') && value.length < 6) {
            setInvalidForm(invalidForm => ({...invalidForm, usernameError: 'Username must be at least 6 characters'}));
        } else {
            setInvalidForm(invalidForm => ({...invalidForm, usernameError: ''}));
        }
    }

    const validateEmail = (value: string) => {
        if (!validator.isEmail(value)) {
            setInvalidForm(invalidForm => ({...invalidForm, emailError: 'Email must be a valid email address'}));
        } else {
            setInvalidForm(invalidForm => ({...invalidForm, emailError: ''}));
        }
    }

    const validatePassword = (value: string) => {
        var isValid: number | boolean = validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        });

        if (!isValid || (typeof isValid === 'number' && isValid < 40)) {
            setInvalidForm(invalidForm => ({...invalidForm, passwordError: 'Password does not meet the requirements'}));
        } else {
            setInvalidForm(invalidForm => ({...invalidForm, passwordError: ''}));
        }
        setPassword(value);
    }

    const validateMatchingPasswords = (value: string) => {
        if (value !== password) {
            setInvalidForm(invalidForm => ({...invalidForm, matchingError: 'Passwords do not match'}));
        } else {
            setInvalidForm(invalidForm => ({...invalidForm, matchingError: ''}));
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        Axios.post(Constants.API_URL + '/Account/Register', {
            Username: data.get('username'),
            Email: data.get('email'),
            Password: data.get('password'),
            ConfirmPassword: data.get('confirm-password')
        }).catch(error => {
            console.log(error);
        })
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2} rowSpacing={0.5}>
                        <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="dense"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => {
                                validateUsername(e.target.value);
                                setSearchTerm(e.target.value);
                            }}
                            helperText = {invalidForm.usernameError + '\n' + invalidForm.usernameUnavailable}
                            error={
                                invalidForm.usernameError !== '' ? true : false || 
                                invalidForm.usernameUnavailable !== '' ? true : false
                            }
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="dense"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => validateEmail(e.target.value)}
                            helperText = {invalidForm.emailError}
                            error={invalidForm.emailError !== '' ? true : false}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="dense"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={(e) => validatePassword(e.target.value)}
                            helperText = {invalidForm.passwordError}
                            error={invalidForm.passwordError !== '' ? true : false}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="dense"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            onChange={(e) => validateMatchingPasswords(e.target.value)}
                            helperText = {invalidForm.matchingError}
                            error={invalidForm.matchingError !== '' ? true : false}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={<Typography variant="body2">I want to receive inspiration, marketing promotions and updates via email.</Typography>}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={
                            invalidForm.usernameError !== '' ? true : false ||
                            invalidForm.emailError !== '' ? true : false ||
                            invalidForm.passwordError !== '' ? true : false ||
                            invalidForm.matchingError !== '' ? true : false ||
                            password === '' ? true : false
                        }
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                                <Typography color="primary.dark" variant="body2">
                                    {"Already have an account? Sing in"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;