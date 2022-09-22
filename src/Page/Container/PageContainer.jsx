import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import RotuerSwitchComponent from '../../Router/routerSwitchComponent'
import AppBarPageContainer from './Components/AppBarPageContainer';
import DrawerHeaderComponent from './Components/DrawerHeaderComponent';
import { selectLoginData } from '../../Redux/StoreComponents/login';
//Css
import './PageContainer.css'



const PageContainer = () => {
    const theme = useTheme();
    const location = useLocation();
    const userData = useSelector(selectLoginData);
    const DrawerHeader = DrawerHeaderComponent()
    const [open, setOpen] = useState(false);
    const [openUser, setOpenUser] = useState(true);

    useEffect(() => {
        setOpenUser(false)
    }, [open]);

    useEffect(() => {
        setOpenUser(false)
    }, [open]);

    return (
        <Box sx={{ display: 'flex' }}>
            <div style={{
                'display': (location.pathname === "/" || location.pathname === "/404_not_found")
                    ? 'none'
                    : 'flex',
            }}>
                <CssBaseline />
                <AppBarPageContainer
                    open={open}
                    setOpen={setOpen}
                    setOpenUser={setOpenUser}
                    openUser={openUser}
                    userData={userData[0]}
                />
            </div>
            <Box component="main"
                className='boxPageContainer'
                sx={{
                    backgroundColor: theme.palette.background.main,
                    height: "100vh",
                    "flexGrow": (location.pathname === "/")
                        ? 0
                        : 1,
                    p: 0
                }}>
                <DrawerHeader style={{
                    'display': (location.pathname === "/" || location.pathname === "/404_not_found")
                        ? 'none'
                        : 'flex'
                }} />
                <RotuerSwitchComponent />
            </Box>
        </Box >
    )
}

export default PageContainer



