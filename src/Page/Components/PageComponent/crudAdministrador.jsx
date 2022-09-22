import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, IconButton, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, PersonRemove, FilterList, ManageSearch, Close } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Dependencias
/* import { selectEmployee, setDataEmployee, setDeleteEmployee } from '../../../Redux/StoreComponents/addEmployeeStore'; */
import { selectLoginData } from '../../../Redux/StoreComponents/login';
import { selectVacunas } from '../../../Redux/StoreComponents/storeTipoDeVacunas';

import { selectEmployee, setEditData, setDeleteEmployeed, clearDataEmployeed } from '../../../Redux/StoreComponents/addEmployeeStore';


import EmployeedForm from './employeedForm';
import "./crudAdministrador.css"


let viewRowsTable = [];
let vacunas = [];

export default function SubjectDataTable() {

    viewRowsTable = useSelector(selectEmployee)
    vacunas = useSelector(selectVacunas)

    const dispatch = useDispatch()
    const userData = useSelector(selectLoginData);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Card className='cardCrudEmpleado'>
                {
                    (viewRowsTable.length !== 0)
                        ?
                        <CustomTable
                            userData={userData}
                            dispatch={dispatch}
                        />
                        :
                        (<div><span>No Existen Empleados Registrados</span></div>)
                }
            </Card>
        </div>

    )
}

const CustomTable = ({ userData, dispatch }) => {

    const [rowTable, setRowTable] = useState(viewRowsTable)
    const [openFilter, setOpenFilter] = useState(false)
    const [update, setUpdate] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        dispatch(clearDataEmployeed())
    };


    const handleDataUpdate = (data) => {
        dispatch(setEditData(data))
        setOpen(true)
        setUpdate(1)
    }

    const handleDeleteUser = (cedula) => {
        dispatch(setDeleteEmployeed(cedula))
    }

    useEffect(() => {
        setRowTable(viewRowsTable)
    }, [viewRowsTable])
    return (
        <CardContent className='cardContentEmpleado'>
            <TableContainer component={Paper}>
                <Box sx={{ display: 'flex', alignItems: "flex-end" }}>
                    <Typography
                        className='TableTitleEmpleados'
                        component="div"
                    >
                        TABLA DE EMPLEADOS
                    </Typography>
                    {(openFilter)
                        ? (
                            <CardOpcionFilter
                                setRowTable={setRowTable}
                            />
                        )
                        : <></>
                    }
                    <IconButton aria-label="update" style={{ padding: " 5px !important" }} size="large" onClick={() => setOpenFilter(!openFilter)}>
                        <FilterList sx={{ fontSize: 25 }} style={{ "color": (openFilter ? "blue" : "black") }} />
                    </IconButton>

                </Box>
                <Table sx={{ minWidth: 600, maxWidth: 1100 }} aria-label="simple table">
                    <TableHead style={{ display: "flex", paddingTop: "1.5rem" }}>
                        <TableRow
                            style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)' }}>
                            <TableCell className='tableGrid'>Cedula</TableCell>
                            <TableCell className='tableGrid'>Nombre</TableCell>
                            <TableCell className='tableGrid'>Apellido</TableCell>
                            <TableCell className='tableGrid' style={{ display: "flex" }}>Correo</TableCell>
                            <TableCell className='tableGrid'>Estado</TableCell>
                            <TableCell className='tableGrid'>Vacuna</TableCell>
                            <TableCell className='tableGrid'>F. Vacunacion</TableCell>
                            <TableCell className='tableGrid'>Contraceña</TableCell>
                            <TableCell className='tableGrid'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '350px' }}>

                        {
                            rowTable.map((row, index) => (
                                <Fila
                                    key={index}
                                    row={row}
                                    handleDataUpdate={handleDataUpdate}
                                    handleDeleteUser={handleDeleteUser}
                                />
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <EmployeedForm
                open={open}
                handleClose={handleClose}
                update={update}
                userData={userData[0]}
            />

        </CardContent >
    )
}

const Fila = ({ row, handleDataUpdate, handleDeleteUser }) => {
    return (
        <TableRow
            style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', /* alignItems: 'center' */ }}
        >
            <TableCell className='tableGrid'>{row.cedula}</TableCell>
            <TableCell className='tableGrid'>{row.nombre}</TableCell>
            <TableCell className='tableGrid'>{row.apellido}</TableCell>
            <TableCell className='tableGrid'>{row.correo}</TableCell>
            <TableCell className='tableGrid'>{(row.estadoVacunacion === "") ? "N/A" : row.estadoVacunacion}</TableCell>
            <TableCell className='tableGrid'>{(row.tipoDeVacuna === "") ? "N/A" : row.tipoDeVacuna}</TableCell>
            <TableCell className='tableGrid' sx={{ display: "flex !important", flexDirection: "column !important", padding: "0.4rem 0.6rem !important" }}>
                {
                    (row.fechaDeVacunacion.length === 0)
                        ? "N/A"
                        : (row.fechaDeVacunacion.map((fechas, index) => <span key={index} style={{ paddingBottom: "0.1rem" }}>{fechas}</span>))
                }
            </TableCell>
            <TableCell className='tableGrid'>{row.password}</TableCell>
            <TableCell className='tableGrid'>
                <IconButton aria-label="update" style={{ padding: " 5px !important" }} size="large" onClick={() => handleDataUpdate(row)}>
                    <Edit fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" style={{ padding: " 5px !important" }} size="large" onClick={() => handleDeleteUser(row.cedula)}>
                    <PersonRemove fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

const CardOpcionFilter = ({ setRowTable }) => {

    const [filter, setFilter] = useState({
        estado: "",
        tipoDeVacuna: "",
        dataRange: [null, null]
    })

    const handleClearSearch = () => {
        setFilter({
            estado: "",
            tipoDeVacuna: "",
            dataRange: [null, null]
        })
        setRowTable(viewRowsTable)
    }

    const requestSearch = () => {
        let filteredRows = []
        if (filter.estado === "" && filter.tipoDeVacuna === "") {
            setRowTable(viewRowsTable)
            return
        }

        if (filter.estado !== "") {
            filteredRows = viewRowsTable.filter((row) => {
                return ((filter.estado === "No Vacunado")
                    ? (row.estadoVacunacion === filter.estado || row.estadoVacunacion === "")
                    : (row.estadoVacunacion === filter.estado)
                )
            });
        }
        if (filter.tipoDeVacuna !== "") {
            filteredRows = viewRowsTable.filter((row) => {
                return (row.tipoDeVacuna === filter.tipoDeVacuna)
            });
        }

        setRowTable(filteredRows)

    }

    return (
        <React.Fragment>
            <div style={{ display: "flex" }}>
                <section style={{ display: "flex" }}>
                    <div style={{ paddingRight: "1rem" }}>
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Estado de Vacunacion</InputLabel>
                            <Select
                                id='estado_de_vacuna'
                                labelId="demo-simple-select-standard-label"
                                value={filter.estado}
                                label="Estado De Vacunacion"
                                sx={{ width: "12rem", height: "3rem" }}
                                className="textFileCardEmpleado"
                                onChange={(e) => { setFilter({ ...filter, estado: e.target.value }) }}
                            >
                                <MenuItem value="Vacunado">Vacunado</MenuItem>
                                <MenuItem value="No Vacunado">No Vacunado</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="standard" sx={{ minWidth: 120 }} disabled={(filter.estado === "" || filter.estado === "No Vacunado") ? true : false}>
                            <InputLabel id="demo-simple-select-standard-label">Tipo de Vacuna</InputLabel>
                            <Select
                                id='tipo_vacuna'
                                labelId="demo-simple-select-standard-label"
                                value={filter.tipoDeVacuna}
                                label="Tipo de Vacuna"
                                sx={{ width: "10rem", height: "3rem" }}
                                className="textFileCardEmpleado"
                                onChange={(e) => { setFilter({ ...filter, tipoDeVacuna: e.target.value }) }}
                            >
                                {vacunas.map(elementoVacuna => {

                                    return (
                                        <MenuItem value={elementoVacuna.name} key={elementoVacuna.id}>
                                            {elementoVacuna.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </section>

                <div style={{ display: "flex" }}>
                    <IconButton aria-label="update" style={{ padding: " 5px !important" }} size="large" onClick={() => requestSearch()}>
                        <ManageSearch sx={{ fontSize: 25 }} />
                    </IconButton>
                    {(filter.estado !== "" || filter.tipoDeVacuna !== "") ? (
                        <IconButton aria-label="update" style={{ padding: " 5px !important" }} size="large" onClick={() => handleClearSearch()}>
                            <Close sx={{ fontSize: 25 }} />
                        </IconButton>
                    ) : <></>}
                </div>
            </div>
        </React.Fragment>
    )
}


