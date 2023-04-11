import React, { useState, useEffect } from 'react';
import { MenuItem, Button, Stack, IconButton, AppBar, Toolbar, Typography, ThemeProvider, createTheme, Menu } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/slices/themeSlice';

const typographyTheme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(',')
    }
});

const NavBar = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const theme = useSelector((state: any) => state.theme.theme);
    const dispatch = useDispatch();

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const handleShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);

    const handleTheme = () => {
        if (theme === 'light') {
            return 'dark';
        } else if (theme === 'dark') {
            return 'light';
        }
    };

    return (
        <div>
            <AppBar className='navbar' position='fixed' sx={{ background: 'linear-gradient(90deg, rgba(235,51,73,1) 0%, rgba(244,92,67,1) 100%);', height: '90px' }}>
                <Toolbar sx={{ width: '100%', height: '100%' }}>
                    <Stack width='100%' height='100%' direction='row' spacing={2} alignItems='center' display='flex'>
                        <IconButton edge='start' color='inherit' size='large' sx={{ mr: '3px', ml: '5px' }} href='/'>
                            <EmailIcon fontSize='large' />
                        </IconButton>
                        <ThemeProvider theme={typographyTheme}>
                            <Typography variant='h6' className='navbarTypography' sx={{ fontSize: '30px', position: 'relative', bottom: '1px', letterSpacing: '0.0.7rem', pointerEvents: 'none' }}>
                                Note<span>All</span>
                            </Typography>
                        </ThemeProvider>
                        {
                            width < 768 ? (
                                <IconButton
                                    edge='end'
                                    color='inherit'
                                    aria-label='menu'
                                    size='large'
                                    sx={{ ml: 'auto' }}
                                    id='smaller-screen-button'
                                    onClick={handleShowMenu}
                                    aria-controls={open ? 'smaller-screen-menu' : undefined}
                                    aria-haspopup='true'
                                    aria-expanded={open ? true : undefined}>
                                    <MenuIcon sx={{ fontSize: 37 }} />
                                </IconButton>
                            ) : (
                                <Stack direction='row' spacing={4} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                    <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito', right: '80px' }} href='/notes'>
                                        Notes
                                    </Button>
                                    <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito', right: '80px' }} href='/profile'>
                                        Profile
                                    </Button>
                                </Stack>
                            )
                        }
                        <IconButton edge='end' color='inherit' size='large' sx={{ ml: 'auto', right: '60px' }} onClick={() => { dispatch({ type: setTheme, payload: handleTheme() }); }}>
                            {
                                theme === 'light' ? (
                                    <WbSunnyIcon sx={{ fontSize: 37 }} />
                                ) : theme === 'dark' ? (
                                    <DarkModeIcon sx={{ fontSize: 37 }} />
                                ) : null
                            }
                        </IconButton>
                    </Stack>
                    <Menu id='smaller-screen-menu' anchorEl={anchorEl} open={open} onClose={handleCloseMenu} MenuListProps={{ 'aria-labelledby': 'smaller-screen-button' }}>
                        <MenuItem sx={{ justifyContent: 'center' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/notes'>
                                Notes
                            </Button>
                        </MenuItem>
                        <MenuItem sx={{ justifyContent: 'center' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/profile'>
                                Profile
                            </Button>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;