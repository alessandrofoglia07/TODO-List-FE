import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';

const Note = (props: { title: string; content: string; id: number }) => {
    const theme = useSelector((state: any) => state.theme.theme);
    const authHeader = useAuthHeader();

    const [elevation, setElevation] = useState<number>(3);

    useEffect(() => {
        if (theme === 'light') {
            setElevation(18);
        } else if (theme === 'dark') {
            setElevation(3);
        }
    }, [theme]);

    const handleEdit = () => {
        // TODO: Implement edit note
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/notes/delete/${props.id}`, { headers: { Authorization: authHeader() } });
    };

    return (
        <div id='note'>
            <Paper id='content' elevation={elevation} sx={{ mt: '20px', height: 'auto', width: '250px', minHeight: '200px', maxHeight: '400px', mr: '40px', mb: '40px' }}>
                <div style={{ maxHeight: '350px', minHeight: '200px', overflowY: 'auto' }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Nunito', textAlign: 'center', mt: '10px', ml: '20px', mr: '20px', wordWrap: 'break-word' }}>
                        <b>{props.title}</b>
                    </Typography>
                    <Typography variant='body1' sx={{ fontFamily: 'Nunito', mt: '10px', textAlign: 'left', ml: '15px', mr: '5px', wordWrap: 'break-word' }}>
                        {props.content}
                    </Typography>
                </div>
                <Stack id='buttons' direction='row' justifyContent='space-evenly' sx={{ position: 'relative', bottom: '0px', width: '250px' }}>
                    <IconButton onClick={handleEdit}>
                        <EditIcon className='noteBtn1' />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon className='noteBtn2' />
                    </IconButton>
                </Stack>
            </Paper>
        </div>
    );
};

export default Note;
