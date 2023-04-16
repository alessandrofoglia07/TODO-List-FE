import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, TextField, Button, Link, Alert, Snackbar, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import NavBar from '../components/navbar';

const InputTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'white'
    },
    '& .MuiInputLabel-root': {
        color: 'white'
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'white'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'white'
    },
    '& .MuiFormHelperText-root': {
        color: 'white',
        pointerEvents: 'none'
    }
});

const SignUpPage = () => {
    const [elevation, setElevation] = useState(12);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [canSubmit, setCanSubmit] = useState(false);
    const [signupError, setSignupError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const form = document.getElementById('paper');
        if (form) {
            form.addEventListener('mouseover', () => {
                setElevation(24);
            });
            form.addEventListener('mouseleave', () => {
                setElevation(12);
            });
        }
    });

    const emailRegex =
        // eslint-disable-next-line no-useless-escape
        /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])?[a-zA-Z0-9!@#$%^&*.]{8,16}$/;

    useEffect(() => {
        if (inputs.email !== '' && inputs.password !== '' && emailRegex.test(inputs.email) && passwordRegex.test(inputs.password)) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/signup', inputs);

        switch (res.data.message) {
            case 'Email is already registered':
                console.log('%cAxios: Email already exists', 'color: cyan');
                setSignupError(true);
                break;
            case 'User created':
                console.log('%cAxios: Account created', 'color: cyan');
                setSignupSuccess(true);
                break;
            default:
                console.log('Server error');
                alert('Server error');
                break;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((init) => ({
            ...init,
            [e.target.name]: e.target.value
        }));
    };

    const handleWidthChange = () => {
        if (width < 1100) {
            return '75vw';
        } else {
            return '25vw';
        }
    };

    const handleErrorAlertClose = () => {
        setSignupError(false);
        setSignupSuccess(false);
    };

    return (
        <div id='SignUpPage'>
            <NavBar />
            <div id='signupForm'>
                <Paper elevation={elevation} className='accessForms' id='paper' sx={{ borderRadius: '20px' }}>
                    <Stack justifyContent='center' spacing={10}>
                        <Typography color='white' fontSize={60} sx={{ fontFamily: 'Nunito', textAlign: 'center', position: 'relative', top: '2vh' }}>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3} alignItems='center'>
                                <InputTextField
                                    name='email'
                                    value={inputs.email}
                                    variant='standard'
                                    label='Email'
                                    type='email'
                                    color='primary'
                                    size='medium'
                                    onChange={handleInputChange}
                                    InputProps={{ style: { color: 'white', fontSize: 30, height: '50px' } }}
                                    InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                    sx={{ width: handleWidthChange(), mt: '5vh' }}
                                />
                                <InputTextField
                                    name='password'
                                    helperText={!canSubmit ? 'Password must be 8-16 characters long and contain at least a number' : ''}
                                    value={inputs.password}
                                    variant='standard'
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    color='primary'
                                    size='medium'
                                    onChange={handleInputChange}
                                    InputProps={{
                                        style: { color: 'white', fontSize: 30, height: '50px' },
                                        endAdornment: (
                                            <IconButton
                                                sx={{ color: 'white' }}
                                                onClick={() => {
                                                    setShowPassword(!showPassword);
                                                }}>
                                                {showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}
                                            </IconButton>
                                        )
                                    }}
                                    InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                    sx={{ width: handleWidthChange() }}
                                />
                                <Button
                                    type='submit'
                                    variant='text'
                                    sx={{ fontSize: '2rem', height: '80px', width: '160px', color: 'white', position: 'relative', top: '5vh' }}
                                    className='btnSubmit'
                                    disabled={!canSubmit}>
                                    Submit
                                </Button>
                            </Stack>
                            <Stack alignItems='center'>
                                <Link href='/login' sx={{ position: 'relative', top: '8vh', width: '300px' }}>
                                    <Typography color='white' fontSize={18} sx={{ textAlign: 'center', pointerEvents: 'visible', width: '300px' }}>
                                        Already have an account?
                                    </Typography>
                                </Link>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
                <Snackbar open={signupError} autoHideDuration={2000} onClose={handleErrorAlertClose}>
                    <Alert severity='error' variant='filled' onClose={handleErrorAlertClose}>
                        Email already exists.
                    </Alert>
                </Snackbar>
                <Snackbar open={signupSuccess} autoHideDuration={2000} onClose={handleErrorAlertClose}>
                    <Alert severity='success' variant='filled' onClose={handleErrorAlertClose}>
                        Sign up successful. Go to login page.
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default SignUpPage;
