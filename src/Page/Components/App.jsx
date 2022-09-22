import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import { Add, Edit } from '@mui/icons-material/';
import { useDispatch, useSelector } from 'react-redux';

import { getDataVacunas } from '../../Redux/StoreComponents/storeTipoDeVacunas';
import { selectLoginData } from '../../Redux/StoreComponents/login';
import { clearDataEmployeed, getDataEmployeed } from '../../Redux/StoreComponents/addEmployeeStore';

import EmployeedForm from './PageComponent/employeedForm';
import CrudAdmin from './PageComponent/crudAdministrador'
import CardEmpleado from './PageComponent/cardEmpleado';

const Index = () => {

    const dispatch = useDispatch()
    const userData = useSelector(selectLoginData);

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(0);

    const handleClose = () => {
        setOpen(false)
        setUpdate(0)
        userData[0].id_rol === 2 ? dispatch(getDataEmployeed(userData[0].user)) : <></>
    }

    const handleButton = () => {
        setOpen(true);
        if (userData[0].id_rol === 1) {
            dispatch(clearDataEmployeed())
            setUpdate(0)
            return
        }
        setUpdate(1)
    }

    useEffect(() => {
        dispatch(getDataVacunas())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        userData[0].id_rol === 2 ? dispatch(getDataEmployeed(userData[0].user)) : <></>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    return (

        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>

            <div >
                {(userData[0].id_rol === 1) ? <CrudAdmin /> : <CardEmpleado />}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "0.5rem 3rem 0rem 0rem", width: "100%" }}>
                <Fab color="secondary" onClick={() => handleButton()}>
                    {(userData[0].id_rol === 1) ? <Add /> : (userData[0].id_rol === 2) ? <Edit /> : <></>}
                </Fab>
            </div>
            <EmployeedForm
                open={open}
                handleClose={handleClose}
                update={update}
                userData={userData[0]}
            />

        </div>
    )
}

export default Index
