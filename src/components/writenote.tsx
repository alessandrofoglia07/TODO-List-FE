import React, { useState, useEffect, useRef } from 'react';
import { Paper, TextField, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';

const WriteNote = (props: { callback: () => void; initTitle: string; initContent: string; id: number | null }) => {
    const auth = useAuthUser();
    const authHeader = useAuthHeader();

    const [title, setTitle] = useState<string>(props.initTitle);
    const [content, setContent] = useState<string>(props.initContent);
    const [editing, setEditing] = useState<boolean>(false);
    const [width, setWidth] = useState(window.innerWidth);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            props.callback();
        }
    };

    useEffect(() => {
        if (props.initTitle !== '' || props.initContent !== '') {
            setEditing(true);
        } else {
            setEditing(false);
        }
    }, [props.initTitle, props.initContent]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    });

    const handleSaveNote = async () => {
        try {
            if (title === '' || content === '') {
                return;
            }

            if (editing && props.id !== null) {
                const note = {
                    userEmail: auth()?.email,
                    title: title,
                    content: content
                };

                const res = await axios.patch('http://localhost:5000/api/notes/update', { note, id: props.id }, { headers: { Authorization: authHeader() } });
                if (res.data.message === 'Note updated') {
                    props.callback();
                }
            } else {
                const note = {
                    userEmail: auth()?.email,
                    title: title,
                    content: content
                };

                const res = await axios.post('http://localhost:5000/api/notes/add', note, { headers: { Authorization: authHeader() } });
                if (res.data.message === 'Note created') {
                    props.callback();
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeWidthProp = () => {
        if (width < 1100) {
            return '80vw';
        } else {
            return '50vw';
        }
    };

    const handleChangeStackWidthProp = () => {
        if (width < 1100) {
            return '25vw';
        } else {
            return '10vw';
        }
    };

    const handleChangeStackLeftProp = () => {
        if (width < 1100) {
            return '55vw';
        } else {
            return '40vw';
        }
    };

    return (
        <div ref={ref} id='writeNoteMenu'>
            <Paper sx={{ width: handleChangeWidthProp(), height: '300px' }} elevation={12}>
                <form noValidate autoComplete='off'>
                    <Stack display='flex' alignItems='center'>
                        <TextField variant='outlined' label='Title' value={title} onChange={(e) => setTitle(e.target.value.slice(0, 55))} sx={{ width: '30vw', mt: '10px' }} />
                        <TextField
                            variant='outlined'
                            label='Content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={{ width: '30vw', mt: '20px' }}
                            multiline
                            rows={6}
                        />
                    </Stack>
                </form>
                <Stack
                    sx={{ position: 'relative', bottom: '250px', height: '300px', width: handleChangeStackWidthProp(), left: handleChangeStackLeftProp() }}
                    direction='row'
                    display='flex'
                    alignItems='end'
                    justifyContent='end'>
                    <IconButton sx={{ position: 'relative', mb: '10px' }} onClick={() => props.callback()}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton sx={{ position: 'relative', mr: '10px', mb: '10px' }} onClick={handleSaveNote}>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </div>
    );
};

export default WriteNote;
