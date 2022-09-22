import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { ChevronRight, Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import HeaderUserAccount from './HeaderUserAccount';

/* const drawerWidth = 240; */

const AppBarPageContainer = ({ open, setOpen, setOpenUser, openUser, userData }) => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <AppBar position="fixed" open={open} sx={{ color: "white" }}>
                <Toolbar className='ToolbarStyle'>

                    <div style={{ width: "100%" }}>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
                            Inventario de vacunación de empleados
                        </Typography>
                    </div>
                    <div className='headerDivContainer'>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            edge="start"
                            sx={{
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                    </div>
                    {theme.direction === 'rtl'
                        ? (
                            <IconButton onClick={() => setOpen(false)}>
                                <ChevronRight />
                            </IconButton>
                        )
                        : (
                            (open === true)
                                ?
                                <HeaderUserAccount
                                    setOpenUser={setOpenUser}
                                    openUser={openUser}
                                    setOpen={setOpen}
                                    theme={theme}
                                    userData={userData}
                                />
                                : <></>
                        )
                    }

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default AppBarPageContainer

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    /* ...(open && {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }), */
}));