import * as React from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Divider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { selectDataEmployee } from '../../../Redux/StoreComponents/addEmployeeStore';
import "./cardEmpleado.css"

const CardEmpleado = () => {
    const dataEmployeed = useSelector(selectDataEmployee)

    const [openAlertDialog, setOpenAlertDialog] = useState({
        openDialog: false,
        dialogControler: true,
    })
    const [ErrorDataEmployeed, setErrorDataEmployeed] = useState(
        {
            cedulaError: false,
            nombreError: false,
            apellidoError: false,
            estadoVacunacionError: false,
            correoError: false,
            fechaNacimientoError: false,
            edadError: false,
            direccionError: false,
            telefonoError: false,
            tipoDeVacunaError: false,
            dosisNumeroError: false,
            fechaDeVacunacionError: false,
        }
    )

    const lackDataValidation = () => {
        (
            dataEmployeed.nombre === "" ||
            dataEmployeed.apellido === "" ||
            dataEmployeed.estadoVacunacion === "" ||
            dataEmployeed.correo === "" ||
            dataEmployeed.fechaNacimiento === "" ||
            dataEmployeed.edad === "" ||
            dataEmployeed.direccion === "" ||
            dataEmployeed.telefono === "" ||
            dataEmployeed.tipoDeVacuna === "" ||
            dataEmployeed.dosisNumero === "" ||
            dataEmployeed.fechaDeVacunacion.length === 0
        )
            ? setOpenAlertDialog({ ...openAlertDialog, openDialog: true })
            : setOpenAlertDialog({ ...openAlertDialog, openDialog: false })
    }

    const dataValidation = () => {
        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let regexNombreApellido = /^[a-zA-Z][a-zA-Z]*(?:\s+[a-zA-Z][a-zA-Z]+)?$/;

        setErrorDataEmployeed({
            ...ErrorDataEmployeed,
            cedulaError: (dataEmployeed.cedula.length < 10) ? true : false,
            nombreError: (dataEmployeed.nombre.length === 0 || !regexNombreApellido.test(dataEmployeed.nombre)) ? true : false,
            apellidoError: (dataEmployeed.apellido.length === 0 || !regexNombreApellido.test(dataEmployeed.apellido)) ? true : false,
            estadoVacunacionError: (dataEmployeed.estadoVacunacion.length === 0) ? true : false,
            correoError: (dataEmployeed.correo.length === 0 || !regexEmail.test(dataEmployeed.correo)) ? true : false,
            fechaNacimientoError: (dataEmployeed.fechaNacimiento.length === 0) ? true : false,
            edadError: (dataEmployeed.edad <= 0) ? true : false,
            direccionError: (dataEmployeed.direccion.length === 0) ? true : false,
            telefonoError: (dataEmployeed.telefono.length === 0) ? true : false,
            tipoDeVacunaError: (dataEmployeed.tipoDeVacuna.length === 0) ? true : false,
            dosisNumeroError: (dataEmployeed.dosisNumero === 0 || dataEmployeed.dosisNumero === "") ? true : false,
            fechaDeVacunacionError: (dataEmployeed.fechaDeVacunacion.length === 0) ? true : false,
        })
    }

    useEffect(() => {
        lackDataValidation()
        dataValidation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataEmployeed])

    return (
        <React.Fragment>
            <Card className='cardEmpleado'>
                <CardContent className='cardContentEmpleado'>
                    <div className='cardContentEmpleadoUp'>
                        <div style={{ padding: "1rem" }}>
                            <CardContent className='cardImageEmpleado'>
                                <img src='/image/carne-de-identidad.png' style={{ minWidth: '180px', maxWidth: '180px' }}></img>
                            </CardContent>
                        </div>
                        <div style={{ paddingLeft: "1rem" }}>
                            <section className='textCard'>
                                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                    <span>
                                        Carnet de Vacunacion
                                    </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", paddingBottom: "1rem" }}>
                                    <img src='/image/logo-con-slogan.png' style={{ minWidth: '110px', maxWidth: '110px' }}></img>
                                </div>
                            </section>

                            <section style={{ display: "flex", paddingTop: "0.5rem" }}>

                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ paddingRight: "1rem" }}>
                                        <TextField
                                            id='cedula'
                                            label="Cedula"
                                            value={dataEmployeed.cedula}
                                            sx={{ width: "8rem" }}
                                            InputProps={{
                                                className: "textFileCardEmpleado",
                                                readOnly: true,
                                            }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='estado'
                                        label="Estado"
                                        value={dataEmployeed.estadoVacunacion}
                                        sx={{ width: "8.5rem" }}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.estadoVacunacionError}
                                        disabled
                                    />
                                </div>
                            </section>

                            <section style={{ display: "flex", paddingTop: "1.5rem" }}>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='nombres'
                                        label="Nombres"
                                        value={dataEmployeed.nombre}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.nombreError}
                                        disabled
                                    />
                                </div>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='apellidos'
                                        label="Apellidos"
                                        value={dataEmployeed.apellido}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.apellidoError}
                                        disabled
                                    />
                                </div>
                            </section>

                            <section style={{ display: "flex", paddingTop: "1.5rem" }}>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='correo'
                                        label="Correo"
                                        value={dataEmployeed.correo}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.correoError}
                                        disabled
                                    />
                                </div>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='fecha_de_nacimiento'
                                        label="Fecha de Nacimiento"
                                        value={dataEmployeed.fechaNacimiento}
                                        sx={{ maxWidth: "9rem" }}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.fechaNacimientoError}
                                        disabled
                                    />
                                </div>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='edad'
                                        label="Edad"
                                        value={dataEmployeed.edad}
                                        sx={{ width: "3.8rem" }}
                                        InputProps={{
                                            className: "textFileCardEdadEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.edadError}
                                        disabled
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                    <Divider />
                    <div className='cardContentEmpleadoDown'>
                        <section className='cardDownTwoSection'>
                            <TextField
                                id="direccion"
                                label="Direccion"
                                multiline
                                rows={4}
                                value={dataEmployeed.direccion}
                                InputProps={{
                                    readOnly: true,
                                }}
                                error={ErrorDataEmployeed.direccionError}
                                disabled
                            />
                        </section>

                        <Divider orientation="vertical" flexItem />

                        <section className='cardDownTwoSection'>
                            <div>
                                <TextField
                                    id='telefono'
                                    label="Telefono/s"
                                    value={dataEmployeed.telefono}
                                    InputProps={{
                                        className: "textFileCardEmpleado",
                                        readOnly: true,
                                    }}
                                    error={ErrorDataEmployeed.telefonoError}
                                    disabled
                                    variant="standard"
                                />
                            </div>
                            <div style={{ paddingTop: "1.5rem", display: "flex" }}>
                                <div style={{ paddingRight: "1rem" }}>
                                    <TextField
                                        id='tipo_de_vacuna'
                                        label="Tipo de Vacuna"
                                        value={dataEmployeed.tipoDeVacuna}
                                        sx={{ width: "10rem" }}
                                        InputProps={{
                                            className: "textFileCardEmpleado",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.tipoDeVacunaError}
                                        disabled
                                        variant="standard"
                                    />
                                </div>
                                <div >
                                    <TextField
                                        id='dosis'
                                        label="Dosis #"
                                        value={dataEmployeed.dosisNumero}
                                        InputProps={{
                                            className: "numeroDeVacunas",
                                            readOnly: true,
                                        }}
                                        error={ErrorDataEmployeed.dosisNumeroError}
                                        disabled
                                        variant="standard"
                                    />
                                </div>
                            </div>
                        </section>

                        <Divider orientation="vertical" flexItem />

                        <section className='cardDownTwoSectionFechas'>
                            <div style={{ paddingBottom: "0.2rem" }}><span>Fechas de Vacunacion</span></div>
                            <div className='cardDownTwoSection' style={{ height: "100%" }}>
                                {(dataEmployeed.fechaDeVacunacion.length !== 0)
                                    ? (
                                        dataEmployeed.fechaDeVacunacion.map((fecha, index) => {
                                            return (
                                                <span style={{ paddingBottom: "0.2rem" }} key={index}>
                                                    {fecha}
                                                </span>
                                            )

                                        })

                                    )
                                    : <></>}
                            </div>
                        </section>
                    </div>
                </CardContent>
            </Card>
            <Dialog
                open={openAlertDialog.openDialog && openAlertDialog.dialogControler}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent >
                    <Box sx={{ height: 130, width: 340, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <img src='/image/advertencia.gif' style={{ minWidth: '80px', maxWidth: '80px' }} alt="Banner"></img>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ display: "flex", justifyContent: "center", color: "orange", fontWeight: "bold" }}>¡Hola!</span>
                            <span style={{ display: "flex", justifyContent: "center", }}>Me Parece que te faltan actualizar unos datos</span>
                        </div>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenAlertDialog({ ...openAlertDialog, openDialog: false, dialogControler: false })
                    }}>
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    )
}


export default CardEmpleado