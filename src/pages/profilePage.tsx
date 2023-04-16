import { useAuthUser, useSignOut } from 'react-auth-kit';
import NavBar from '../components/navbar';
import PersonIcon from '@mui/icons-material/Person';
import { Paper, Typography, Stack, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const ProfileDashboardPage = () => {
    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#ffffff'
            }
        }
    });

    const [elevation, setElevation] = useState(12);
    const [smallerScreen, setSmallerScreen] = useState(false);

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
    }, []);

    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setSmallerScreen(true);
        } else {
            setSmallerScreen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    }, []);

    const auth = useAuthUser();
    const signOut = useSignOut();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div id='ProfilePage'>
            <NavBar />
            <Paper elevation={elevation} className='profileDashboard' id='paper'>
                <Stack justifyContent='center' spacing={10}>
                    <PersonIcon sx={{ fontSize: 130, color: 'white', position: 'relative', top: '50px', alignSelf: 'center' }} />
                    <Typography color='white' fontSize={smallerScreen ? 40 : 60} sx={{ fontFamily: 'Futura', textAlign: 'center', position: 'relative', top: '-10px' }}>
                        Hello {auth()!.username}
                    </Typography>
                    <ThemeProvider theme={customTheme}>
                        <Stack direction='row' justifyContent='center' spacing={0} sx={{ flexWrap: 'wrap' }}>
                            <Button
                                variant='outlined'
                                color='primary'
                                style={{ position: 'relative', top: '-210px', borderWidth: '5px', width: '400px', alignSelf: 'center', height: '100px' }}
                                onClick={handleSignOut}>
                                <Typography color='white' fontSize={40} sx={{ fontFamily: 'Futura', textAlign: 'center', position: 'relative', top: '0px' }}>
                                    Sign Out
                                </Typography>
                            </Button>
                        </Stack>
                    </ThemeProvider>
                </Stack>
            </Paper>
        </div>
    );
};

export default ProfileDashboardPage;
