import React from "react";
import { Button, Avatar, Collapse, IconButton } from "@mui/material";
import { ChevronLeft } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { setDeleteLoginData } from "../../../Redux/StoreComponents/login";

const HeaderUserAccount = ({ setOpenUser, openUser, setOpen, theme, userData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column", width: "40%", cursor: "pointer" }}>
                <div className='drawerHeaderContainer'>
                    <div style={{ display: "flex", alignItems: "center" }} onClick={() => setOpenUser(!openUser)}>
                        <div>
                            <Avatar sx={{ backgroundColor: theme.palette.logo.main }}>{typeof userData !== 'string' ? userData.name.charAt(0) : <></>}</Avatar>
                        </div>
                        <div className='drawerHeaderUserDataAcount'>
                            <span className='userHeaderAccount'>{userData.name}.</span>
                            <span className='userHeaderName'>{"//. " + userData.rol}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <ChevronLeft color="neutral" />
                        </IconButton>
                    </div>
                </div>
                <Collapse
                    in={openUser}
                    timeout="auto"
                    style={{ transformOrigin: '0 0 0' }}
                    {...(openUser ? { timeout: 500 } : {})}
                    unmountOnExit
                >
                    <div className='logoutButtonContainer'>
                        <Button
                            className="logoutButton"
                            variant="outlined"
                            color="neutral"
                            onClick={() => {
                                navigate('/')
                                dispatch(setDeleteLoginData())
                            }}
                        >
                            Cerrar Sesion
                        </Button>
                    </div>
                </Collapse>
            </div>
        </React.Fragment>
    )
}

export default HeaderUserAccount