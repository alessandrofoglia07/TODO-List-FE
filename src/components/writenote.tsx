import React, { useState, useEffect, useRef } from 'react';
import { Paper, TextField, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const WriteNote = (props: { callback: () => void; }) => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            props.callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const handleSaveNote = () => {
        if (title === '' || content === '') {
            return;
        }
        const note = {
            userEmail: '',
            title: title,
            content: content
        };
        // TODO: Save note to database
    };

    return (
        <div ref={ref}>
            <Paper sx={{ width: '50vw', height: '300px' }} elevation={12}>
                <Stack display='flex' alignItems='center'>
                    <TextField variant='outlined' label='Title' value={title} onChange={(e) => setTitle(e.target.value.slice(0, 55))} sx={{ width: '30vw', mt: '10px' }} />
                    <TextField variant='outlined' label='Content' value={content} onChange={(e) => setContent(e.target.value)} sx={{ width: '30vw', mt: '20px' }} multiline rows={6} />
                </Stack>
                <Stack sx={{ position: 'relative', bottom: '250px', height: '300px', width: '192px', left: '770px' }} direction='row' display='flex' alignItems='end'>
                    <IconButton sx={{ position: 'relative', left: '10px', mb: '20px', ml: '70px' }} onClick={() => props.callback()}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton sx={{ position: 'relative', left: '20px', mb: '20px' }} onClick={handleSaveNote}>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </div>
    );
};

export default WriteNote;