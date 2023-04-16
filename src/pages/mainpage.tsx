/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Typography, Stack, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/navbar';
import WriteNote from '../components/writenote';
import { useSelector } from 'react-redux';
import { Theme } from '@mui/material';
import axios from 'axios';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import Note from '../components/note';

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
    const auth = useAuthUser();
    const authHeader = useAuthHeader();

    const [notes, setNotes] = useState<any[]>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [muiTheme, setMuiTheme] = useState<Theme>(lightTheme);
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleClick = () => {
        setWriting(true);
    };

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    const getNotes = async () => {
        const email = auth()?.email;
        const res = await axios.post('http://localhost:5000/api/notes/getAll', { userEmail: email }, { headers: { Authorization: authHeader() } });
        setNotes(res.data);
    };

    useEffect(() => {
        getNotes();
    });

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

    const handleChangeWidthProp = () => {
        if (width < 1100) {
            return '80vw';
        } else {
            return '50vw';
        }
    };

    return (
        <div className='mainPage'>
            <NavBar />
            <Stack direction='column' display='flex' alignItems='center' sx={{ position: 'absolute', mt: '120px', width: '100%' }}>
                <ThemeProvider theme={muiTheme}>
                    {writing ? (
                        <WriteNote callback={handleCloseWriteNote} />
                    ) : (
                        <TextField variant='outlined' value='Write a note' sx={{ width: '50vw' }} InputProps={{ readOnly: true }} onClick={handleClick} />
                    )}
                </ThemeProvider>

                <Stack direction='row' display='flex' justifyContent='center' sx={{ width: handleChangeWidthProp(), mt: '20px', flexWrap: 'wrap' }}>
                    {notes.map((note) => (
                        <Note key={note._id} id={note._id} title={note.title} content={note.content} />
                    ))}
                </Stack>
            </Stack>
        </div>
    );
};

export default MainPage;
