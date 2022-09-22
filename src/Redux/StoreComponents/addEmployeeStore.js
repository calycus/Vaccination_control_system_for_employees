
import { createSlice } from "@reduxjs/toolkit";

export const getInfo = createSlice({
    name: 'employee',
    initialState: {
        employeed: JSON.parse(localStorage.getItem("Employees") || "[]"),
        verifyEmployee: false,
        dataEmployeed: {
            cedula: "",
            nombre: "",
            apellido: "",
            estadoVacunacion: "",
            correo: "",
            fechaNacimiento: "",
            edad: 0,
            direccion: "",
            telefono: "",
            tipoDeVacuna: "",
            dosisNumero: 0,
            fechaDeVacunacion: [],
            password: "",
            id: 2
        },
    },

    reducers: {
        getVerifyEmployee: (state) => {
            let arrayEmpleados = JSON.parse(JSON.stringify(state.employeed))
            state.verifyEmployee = false

            arrayEmpleados.forEach(empleados => {
                if (empleados.cedula === state.dataEmployeed.cedula) {
                    state.verifyEmployee = true
                    return
                }
            })
        },

        setAddEmployeed: (state) => {
            let empleados = localStorage.getItem('Employees') || ""
            if (empleados === "") {
                localStorage.setItem('Employees', '[]')
                empleados = '[]'
            }
            let empleadosArray = JSON.parse(empleados)

            empleadosArray.push(state.dataEmployeed)
            state.employeed = empleadosArray
            localStorage.setItem('Employees', JSON.stringify(empleadosArray))
        },

        setUpdateEmployeed: (state) => {
            let arrayEmpleados = JSON.parse(JSON.stringify(state.employeed))
            /* let updateEmpleado = action.payload */

            arrayEmpleados.forEach(empleado => {
                if (empleado.cedula === state.dataEmployeed.cedula) {
                    empleado.nombre = state.dataEmployeed.nombre
                    empleado.apellido = state.dataEmployeed.apellido
                    empleado.estadoVacunacion = state.dataEmployeed.estadoVacunacion
                    empleado.correo = state.dataEmployeed.correo
                    empleado.fechaNacimiento = state.dataEmployeed.fechaNacimiento
                    empleado.edad = state.dataEmployeed.edad
                    empleado.direccion = state.dataEmployeed.direccion
                    empleado.telefono = state.dataEmployeed.telefono
                    empleado.tipoDeVacuna = state.dataEmployeed.tipoDeVacuna
                    empleado.dosisNumero = state.dataEmployeed.dosisNumero
                    empleado.fechaDeVacunacion = state.dataEmployeed.fechaDeVacunacion
                    return
                }
            });
            state.employeed = arrayEmpleados

            localStorage.setItem('Employees', '[]')
            localStorage.setItem('Employees', JSON.stringify(arrayEmpleados))
        },

        setDeleteEmployeed: (state, action) => {
            let arrayEmployeed = JSON.parse(JSON.stringify(state.employeed))
            let idEmployeed = action.payload

            arrayEmployeed = arrayEmployeed.filter(data => data.cedula !== idEmployeed)

            state.employeed = arrayEmployeed

            localStorage.setItem('Employees', '[]')
            localStorage.setItem('Employees', JSON.stringify(arrayEmployeed))

        },

        setEditData: (state, action) => {
            let data = action.payload

            state.dataEmployeed.cedula = data.cedula
            state.dataEmployeed.nombre = data.nombre
            state.dataEmployeed.apellido = data.apellido
            state.dataEmployeed.estadoVacunacion = data.estadoVacunacion
            state.dataEmployeed.correo = data.correo
            state.dataEmployeed.fechaNacimiento = data.fechaNacimiento
            state.dataEmployeed.edad = data.edad
            state.dataEmployeed.direccion = data.direccion
            state.dataEmployeed.telefono = data.telefono
            state.dataEmployeed.tipoDeVacuna = data.tipoDeVacuna
            state.dataEmployeed.dosisNumero = data.dosisNumero
            state.dataEmployeed.fechaDeVacunacion = data.fechaDeVacunacion
            state.dataEmployeed.password = data.password
            state.dataEmployeed.id = 2
        },

        getDataEmployeed: (state, action) => {
            let arrayEmployeed = JSON.parse(JSON.stringify(state.employeed))
            let id_user = action.payload

            arrayEmployeed.forEach(empleado => {
                if (empleado.cedula === id_user) {
                    state.dataEmployeed.cedula = empleado.cedula
                    state.dataEmployeed.nombre = empleado.nombre
                    state.dataEmployeed.apellido = empleado.apellido
                    state.dataEmployeed.estadoVacunacion = empleado.estadoVacunacion
                    state.dataEmployeed.correo = empleado.correo
                    state.dataEmployeed.fechaNacimiento = empleado.fechaNacimiento
                    state.dataEmployeed.edad = empleado.edad
                    state.dataEmployeed.direccion = empleado.direccion
                    state.dataEmployeed.telefono = empleado.telefono
                    state.dataEmployeed.tipoDeVacuna = empleado.tipoDeVacuna
                    state.dataEmployeed.dosisNumero = empleado.dosisNumero
                    state.dataEmployeed.fechaDeVacunacion = empleado.fechaDeVacunacion

                    return
                }
            })

        },

        setDataEmployeed: (state, action) => {
            let data = action.payload
            if (data.campo === "fechaDeVacunacion") {
                state.dataEmployeed[data.campo].push(data.valor)
                return
            }
            state.dataEmployeed[data.campo] = data.valor
        },

        clearDataEmployeed: (state) => {
            let setData = {
                cedula: "",
                nombre: "",
                apellido: "",
                estadoVacunacion: "",
                correo: "",
                fechaNacimiento: "",
                edad: 0,
                direccion: "",
                telefono: "",
                tipoDeVacuna: "",
                dosisNumero: 0,
                fechaDeVacunacion: [],
                password: "",
                id: 2
            }

            state.dataEmployeed = setData
        },

    }
})

export const { getVerifyEmployee, setAddEmployeed, setUpdateEmployeed, setDeleteEmployeed, getDataEmployeed, setDataEmployeed, setEditData, clearDataEmployeed } = getInfo.actions;
export const selectEmployee = (state) => state.employee.employeed;
export const selectDataEmployee = (state) => state.employee.dataEmployeed;
export const selectVerifyEmployee = (state) => state.employee.verifyEmployee;

export default getInfo.reducer;
