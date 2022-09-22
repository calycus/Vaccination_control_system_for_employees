import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, Fade, FormControl, InputLabel, MenuItem, Select, Slide, TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@mui/icons-material';

import { selectVacunas } from '../../../Redux/StoreComponents/storeTipoDeVacunas';
import { selectDataEmployee, selectVerifyEmployee, getVerifyEmployee, setAddEmployeed, setDataEmployeed, setUpdateEmployeed } from '../../../Redux/StoreComponents/addEmployeeStore'

import "./employeedForm.css"

let vacunas = [];

const EmployeedForm = ({ open, handleClose, update, userData }) => {
  const dispatch = useDispatch();
  vacunas = useSelector(selectVacunas);
  let dataEmployeed = useSelector(selectDataEmployee)
  let verifyEmployee = useSelector(selectVerifyEmployee)

  const [loadControler, setLoadControler] = useState({ loading: false, dialogLoad: false })
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

  const sendDataValidation = () => {
    dispatch(getVerifyEmployee())
    if (update === 0) {
      if (!ErrorDataEmployeed.cedulaError && !ErrorDataEmployeed.nombreError &&
        !ErrorDataEmployeed.apellidoError && !ErrorDataEmployeed.correoError) {
        return true
      }
    } else {
      if (!ErrorDataEmployeed.cedulaError && !ErrorDataEmployeed.nombreError && !ErrorDataEmployeed.apellidoError && !ErrorDataEmployeed.estadoVacunacionError &&
        !ErrorDataEmployeed.correoError && !ErrorDataEmployeed.fechaNacimientoError && !ErrorDataEmployeed.edadError && !ErrorDataEmployeed.direccionError &&
        !ErrorDataEmployeed.telefonoError && !ErrorDataEmployeed.tipoDeVacunaError && !ErrorDataEmployeed.dosisNumeroError && !ErrorDataEmployeed.fechaDeVacunacionError) {
        return true
      }
    }


    return false
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

  const passwordGenerate = () => {
    const lower_case = "abcdefghijklmnopqrstuvwxyz";
    const upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const symbols = "@#$%&";
    const length_for_pass = 6;

    let Use_for = lower_case + upper_case + number + symbols;

    let password = ""

    for (var i = 1; i <= length_for_pass; i++) {
      var char = Math.floor(Math.random()
        * Use_for.length + 1);
      password += Use_for.charAt(char)
    }
    dispatch(setDataEmployeed({ campo: "password", valor: password }))
    return password
  }

  const handleSendData = async () => {
    let validation = await sendDataValidation()
    if (validation) {
      if (verifyEmployee) {
        alert("Empleado ya Existente!!!!")
        setErrorDataEmployeed({ ...ErrorDataEmployeed, cedulaError: true })
        return
      }
      
      setLoadControler({ ...loadControler, loading: true, dialogLoad: true })
      handleClose()

      if (update === 0) {
        let password = await passwordGenerate()

        setTimeout(() => {
          setLoadControler({ ...loadControler, loading: false, dialogLoad: true })
          password !== "" ? dispatch(setAddEmployeed()) : <></>
        }, 500)
        return
      }

      setTimeout(() => {
        setLoadControler({ ...loadControler, loading: false, dialogLoad: true })
        dispatch(setUpdateEmployeed())
      }, 500)
      return
    }
    alert("Falatan Campos por Rellenar")
  }

  useEffect(() => {
    dataValidation()
  }, [dataEmployeed])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div>
        <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
          <img src='/image/bg.png' style={{ minWidth: '150px', maxWidth: '150px' }} alt="Banner"></img>
        </Box>
        <DialogTitle sx={{ paddingTop: "0rem", paddingBottom: "0rem" }}>{(update === 1) ? "Actualizacion de Datos" : "Registro De Empleados"}</DialogTitle>
      </div>
      <form>
        <DialogContent>
          <FromEmpleadoAdmin
            update={update}
            userData={userData}
            dataEmployeed={dataEmployeed}
            dispatch={dispatch}
            ErrorDataEmployeed={ErrorDataEmployeed}
          />

        </DialogContent >
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => handleSendData()}>{update === 1 ? "Actualizar" : "Registrar"}</Button>
        </DialogActions>
      </form>

      <section>
        <Dialog
          open={loadControler.dialogLoad}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Box sx={{ overflowY: "hidden", minHeight: 130, maxHeight: 150, width: 340, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Fade
                in={loadControler.loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  transitionDelay: loadControler.loading ? '100ms' : '0ms',
                }}
                unmountOnExit
              >
                <CircularProgress color="success" />
              </Fade>
              {(!loadControler.loading)
                ? (
                  <div style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    transitionDelay: !loadControler.loading ? '100ms' : '20ms',
                  }}>
                    <span style={{ fontWeight: "bold", color: "green", textAlign: "center", paddingBottom: "1rem" }}>
                      {(userData.id_rol === 2 || update === 1) ? "Datos Actualizados Correctamente" : "Empleado Registrado Exitosamente"}
                    </span>

                    {(userData.id_rol === 2 || update === 1)
                      ? (
                        <section style={{ display: "flex", justifyContent: "center" }}>
                          <img src='/image/user-add.gif' style={{ minWidth: '80px', maxWidth: '80px' }} alt="Banner"></img>
                        </section>
                      )
                      : (
                        <div style={{
                          display: "flex",
                          padding: "0.5rem 1rem"
                        }}>
                          <section>
                            <img src='/image/usuario.png' style={{ minWidth: '80px', maxWidth: '80px' }} alt="Banner"></img>
                          </section>
                          <section className='dialogLoading'>
                            <div style={{
                              display: "flex",
                              width: "100%",
                            }} >
                              <span style={{ fontWeight: "bold", width: "55%" }}>Usuario: </span> <span style={{ fontWeight: "bold", width: "40%" }}>{dataEmployeed.cedula}</span>
                            </div>
                            <div style={{
                              display: "flex",
                              width: "100%",
                            }}>
                              <span style={{ fontWeight: "bold", width: "55%" }}>Contraseña:</span><span style={{ fontWeight: "bold", width: "40%" }}>{dataEmployeed.password}</span>
                            </div>
                          </section>
                        </div>
                      )
                    }

                  </div>
                )
                : <></>}
            </Box>
          </DialogContent>
          {(!loadControler.loading) ? (
            <DialogActions>
              <Button onClick={() => {
                setLoadControler({ ...loadControler, dialogLoad: false })
              }}>
                Aceptar
              </Button>
            </DialogActions>
          )
            : <></>}
        </Dialog>
      </section>
    </Dialog >

  );
}


export default EmployeedForm

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const FromEmpleadoAdmin = ({ update, userData, dataEmployeed, dispatch, ErrorDataEmployeed }) => {

  function handleCheckCedula(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value.length <= 10) {
      if (e.target.value === '' || re.test(e.target.value)) {
        dispatch(setDataEmployeed({ campo: "cedula", valor: e.target.value }))
      }
    }
  }
  function handleCheckEdad(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      dispatch(setDataEmployeed({ campo: "edad", valor: e.target.value }))
    }
  }
  function handleReset() { dispatch(setDataEmployeed({ campo: "edad", valor: "" })) }

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <section style={{ display: "flex" }}>
          <section style={{ display: "flex", alignItems: "center" }}>
            <DialogContent className='imgContent'>
              <img className='imgDialogContent' src='/image/user-add.gif' style={{ minWidth: '120px', maxWidth: '120px' }} alt="Add Employeed"></img>
            </DialogContent>
          </section>
          <Divider orientation="vertical" flexItem />
          <section>
            <div style={{ display: "flex", paddingBottom: "0.5rem" }}>
              <div style={{ paddingLeft: "1rem", display: "flex", alignItems: "self-end" }}>
                <TextField
                  id='cedula'
                  label="Cedula"
                  value={dataEmployeed.cedula}
                  sx={{ width: "11rem" }}
                  InputProps={{
                    className: "textFileCardEmpleado",
                    'readOnly': (userData.id_rol === 1) ? false : true,
                  }}
                  onChange={(e) => { handleCheckCedula(e) }}
                  error={ErrorDataEmployeed.cedulaError}
                />
              </div>
              {
                (userData.id_rol === 2 || update === 1)
                  ? (<div style={{
                    paddingLeft: "1rem", width: "100%", display: "flex", justifyContent: "right"
                  }}>
                    <FormControl sx={{ minWidth: 120 }} error={ErrorDataEmployeed.estadoVacunacionError}>
                      <InputLabel id="demo-simple-select-standard-label">Estado</InputLabel>
                      <Select
                        id='estado'
                        labelId="demo-simple-select-standard-label"
                        value={dataEmployeed.estadoVacunacion}
                        label="Estado"
                        sx={{ width: "8.5rem" }}
                        className="textFileCardEmpleado"
                        onChange={(e) => {
                          dispatch(setDataEmployeed({ campo: "estadoVacunacion", valor: e.target.value }))
                        }}
                        error={ErrorDataEmployeed.estadoVacunacionError}
                      >
                        <MenuItem value="No Vacunado">No Vacunado</MenuItem>
                        <MenuItem value="Vacunado">Vacunado</MenuItem>

                      </Select>
                    </FormControl>
                  </div>)
                  : <></>
              }
            </div>

            <div
              style={{
                display: "flex",
                "flexDirection": (userData.id_rol === 2 || update === 1) ? "row" : "column",
                paddingTop: "1rem"
              }}>
              <div
                style={{
                  paddingLeft: "1rem",
                  "paddingBottom": (userData.id_rol === 2 || update === 1) ? "0rem" : "1rem"
                }}>
                <TextField
                  id='nombres'
                  label="Nombres"
                  value={dataEmployeed.nombre}
                  InputProps={{
                    className: "textFileCardEmpleado",
                    readOnly: false,
                  }}
                  onChange={(e) => {
                    dispatch(setDataEmployeed({ campo: "nombre", valor: e.target.value }))
                  }}
                  error={ErrorDataEmployeed.nombreError}
                />
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <TextField
                  id='apellidos'
                  label="Apellidos"
                  value={dataEmployeed.apellido}
                  InputProps={{
                    className: "textFileCardEmpleado",
                    readOnly: false,
                  }}
                  onChange={(e) => {
                    dispatch(setDataEmployeed({ campo: "apellido", valor: e.target.value }))
                  }}
                  error={ErrorDataEmployeed.apellidoError}
                />
              </div>
            </div>

            <div style={{ display: "flex", paddingTop: "1rem" }}>
              <div style={{ paddingLeft: "1rem" }}>
                <TextField
                  id='correo'
                  label="Correo"
                  value={dataEmployeed.correo}
                  sx={{ 'width': (userData.id_rol === 2 || update === 1) ? "12rem" : "auto" }}
                  InputProps={{
                    className: "textFileCardEmpleado",
                    readOnly: false,
                  }}
                  onChange={(e) => {
                    dispatch(setDataEmployeed({ campo: "correo", valor: e.target.value }))
                  }}
                  error={ErrorDataEmployeed.correoError}
                />
              </div>

              {(userData.id_rol === 2 || update === 1)
                ? (
                  <section style={{ display: "flex" }}>
                    <div style={{ paddingLeft: "1rem" }}>
                      <DatePicker
                        id='fecha_de_nacimiento'
                        label="Fecha de Nacimiento"
                        value={dataEmployeed.fechaNacimiento}
                        sx={{ width: "12rem" }}
                        InputProps={{
                          className: "textFileCardEmpleado",
                          readOnly: false,
                        }}
                        onChange={(e) => {
                          dispatch(setDataEmployeed({ campo: "fechaNacimiento", valor: e.$D + "/" + (e.$M + 1) + "/" + e.$y }))
                        }}
                        error={ErrorDataEmployeed.fechaNacimientoError}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                      <TextField
                        id='edad'
                        label="Edad"
                        value={dataEmployeed.edad}
                        sx={{ width: "4rem" }}
                        InputProps={{
                          className: "textFileCardEmpleado",
                          readOnly: false,
                        }}
                        onChange={(e) => { handleCheckEdad(e) }}
                        onClick={() => { handleReset() }}
                        error={ErrorDataEmployeed.edadError}
                      />
                    </div>
                  </section>
                )
                : <></>
              }
            </div>
          </section>
        </section>
        {
          (userData.id_rol === 2 || update === 1)
            ? (
              <FromEmpleadoForEmployeed
                dataEmployeed={dataEmployeed}
                ErrorDataEmployeed={ErrorDataEmployeed}
                dispatch={dispatch}
              />
            )
            : <></>
        }

      </div>
    </React.Fragment>
  )
}

const FromEmpleadoForEmployeed = ({ dataEmployeed, ErrorDataEmployeed, dispatch }) => {

  const [fecha, setFecha] = useState("")

  function handleCheckPhone(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value.length <= 10) {
      if (e.target.value === '' || re.test(e.target.value)) {
        dispatch(setDataEmployeed({ campo: "telefono", valor: e.target.value }))
      }
    }
  }

  function handleCheckDosis(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      dispatch(setDataEmployeed({ campo: "dosisNumero", valor: e.target.value }))
    }
  }
  function handleReset() { dispatch(setDataEmployeed({ campo: "dosisNumero", valor: "" })) }

  return (
    <React.Fragment>
      <section style={{ paddingTop: "1rem" }}>
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
                readOnly: false,
              }}
              onChange={(e) => {
                dispatch(setDataEmployeed({ campo: "direccion", valor: e.target.value }))
              }}
              error={ErrorDataEmployeed.direccionError}
            />
          </section>

          <Divider orientation="vertical" flexItem />

          <section className='cardDownTwoSection'>
            <div>
              <TextField
                id='telefono'
                label="Telefono"
                value={dataEmployeed.telefono}
                InputProps={{
                  className: "textFileCardEmpleado",
                  readOnly: false,
                }}
                variant="standard"
                onChange={(e) => { handleCheckPhone(e) }}
                error={ErrorDataEmployeed.telefonoError}
              />
            </div>
            {(dataEmployeed.estadoVacunacion === "Vacunado")
              ? (
                <div style={{ paddingTop: "1.5rem", display: "flex" }} >
                  <div style={{ paddingRight: "1rem" }}>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Tipo de Vacuna</InputLabel>
                      <Select
                        id='tipo_de_vacuna'
                        labelId="demo-simple-select-standard-label"
                        value={dataEmployeed.tipoDeVacuna}
                        label="Tipo de Vacuna"
                        sx={{ width: "10rem" }}
                        className="textFileCardEmpleado"
                        error={ErrorDataEmployeed.tipoDeVacunaError}
                        onChange={(e) => {
                          dispatch(setDataEmployeed({ campo: "tipoDeVacuna", valor: e.target.value }))
                        }}
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
                  <div >
                    <TextField
                      id='dosis'
                      label="Dosis #"
                      value={dataEmployeed.dosisNumero}
                      InputProps={{
                        className: "numeroDeVacunas",
                        readOnly: false,
                      }}
                      variant="standard"
                      onChange={(e) => { handleCheckDosis(e) }}
                      onClick={() => { handleReset() }}
                    />
                  </div>
                </div>
              )
              : <></>}
          </section>

          <Divider orientation="vertical" flexItem />
          {(dataEmployeed.dosisNumero !== 0)
            ? (
              <section className='cardDownTwoSection'>
                <div>
                  <DatePicker
                    id='fecha_de_vacunacion'
                    label="F. Vacunacion"
                    value={fecha}
                    sx={{ width: "6rem" }}
                    InputProps={{
                      className: "textFileCardEmpleado",
                      readOnly: false,
                    }}
                    onChange={(e) => {
                      let newFecha = e.$D + "/" + (e.$M + 1) + "/" + e.$y
                      setFecha(newFecha)
                    }}
                    renderInput={(params) =>
                      <FechaComponent
                        params={params}
                        dataEmployeed={dataEmployeed}
                        setDataEmployeed={setDataEmployeed}
                        dispatch={dispatch}
                      />}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {dataEmployeed.fechaDeVacunacion.length !== 0
                    ? (
                      dataEmployeed.fechaDeVacunacion.map((fechas, index) => <span key={index} style={{ borderBottom: "inset" }}>{fechas}</span>)
                    )
                    : <></>
                  }
                </div>
              </section>
            )
            : <></>}

        </div>
      </section>

    </React.Fragment >
  )
}

const FechaComponent = ({ params, dataEmployeed, dispatch }) => {

  const setFechaVacunacion = (newFecha) => {
    let newValue = ((dataEmployeed.fechaDeVacunacion.length === 0) ? [] : dataEmployeed.fechaDeVacunacion);
    newValue.push(newFecha.inputProps.value)

    dispatch(setDataEmployeed({ campo: "fechaDeVacunacion", valor: newValue }))
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "84%" }}>
        <TextField {...params} />
      </div>
      <div style={{ width: "15%" }}>
        <Button
          disabled={
            (dataEmployeed.fechaDeVacunacion.length >= parseInt(dataEmployeed.dosisNumero)
              || dataEmployeed.dosisNumero === ""
              || params.error
            ) ? true : false}
          sx={{ minWidth: "40px" }}
          onClick={() => setFechaVacunacion(params)} >
          <Add />
        </Button>
      </div>
    </div>
  )
}