/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, Stack, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/navbar';
import WriteNote from '../components/writenote';
import { useSelector } from 'react-redux';
import { Theme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
});

const MainPage = () => {

    const theme = useSelector((state: any) => state.theme.theme);

    const [notes, setNotes] = useState<any[]>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [muiTheme, setMuiTheme] = useState<Theme>(lightTheme);

    const handleClick = () => {
        setWriting(true);
    };

    useEffect(() => {
        if (theme === 'light') {
            setMuiTheme(lightTheme);
        } else if (theme === 'dark') {
            setMuiTheme(darkTheme);
        }
    }, [theme]);

    const handleCloseWriteNote = () => {
        setWriting(false);
    };

    return (
        <div className='mainPage'>
            <NavBar />
            <Stack direction='column' display='flex' alignItems='center' sx={{ position: 'absolute', mt: '120px', width: '100%' }}>
                <ThemeProvider theme={muiTheme}>
                    {
                        writing ? (
                            <WriteNote callback={handleCloseWriteNote} />
                        ) : (
                            <TextField variant='outlined' value='Write a note' sx={{ width: '50vw' }} InputProps={{ readOnly: true }} onClick={handleClick} />
                        )
                    }
                </ThemeProvider>
            </Stack>
        </div>
    );
};

export default MainPage;