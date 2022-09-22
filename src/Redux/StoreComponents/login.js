import { createSlice } from "@reduxjs/toolkit";


export const getInfo = createSlice({
    name: 'loginUser',
    initialState: {
        loginData: JSON.parse(localStorage.getItem("loginData") || "[]"),
    },

    reducers: {
        setUser: (state, action) => {

            state.loginData = "[]"
            let data = JSON.parse(state.loginData)
            data.push({
                user: action.payload.userName,
                rol: action.payload.rol,
                id_rol: action.payload.id_rol,
                name: action.payload.name
            })
            localStorage.setItem('loginData', JSON.stringify(data))
            if (data[0].id_rol !== 0) {
                console.log(data[0].id_rol);
                window.location.pathname = "/index"
            }
        },

        getEmpleados: (state, action) => {
            state.loginData = "[]"
            let data = JSON.parse(state.loginData)

            if (action.payload.empleados.length === 0) {

                alert("Error!!! Usuario no Encontrado")
                return
            }

            action.payload.empleados.forEach(empleado => {
                if (empleado.cedula === action.payload.userName) {
                    if (empleado.cedula === action.payload.userName && empleado.password === action.payload.userPassword) {
                        action.payload.dataRol.forEach(elementoRol => {
                            if (elementoRol.id === empleado.id) {
                                data.push({
                                    user: action.payload.userName,
                                    rol: elementoRol.rol,
                                    id_rol: empleado.id,
                                    name: empleado.nombre
                                })
                                localStorage.setItem('loginData', JSON.stringify(data))
                                return
                            }
                        })
                        return
                    }
                }
                return
            })
            if (data[0].id_rol !== 0) {
                console.log(data[0].id_rol);
                window.location.pathname = "/index"
            }
        },

        setDeleteLoginData: (state, action) => {
            state.loginData = "[]"
            let data = JSON.parse(state.loginData)
            localStorage.setItem('loginData', JSON.stringify(data))
        }
    }
})

export const getDataUserLogin = (userName, userPassword) => async (dispatch) => {

    const resUser = await fetch("/fake_api/users.json", {
        method: "GET"
    })

    const resRol = await fetch("/fake_api/roles.json", {
        method: "GET"
    })

    const empleados = JSON.parse(localStorage.getItem('Employees') || "[]")

    const dataUser = await resUser.json()
    const dataRol = await resRol.json()

    dataUser.forEach(elementoUsuario => {
        (elementoUsuario.user === userName && elementoUsuario.password === userPassword)
            ? (
                dataRol.forEach(elementoRol => {
                    (elementoRol.id === elementoUsuario.id)
                        ? dispatch(setUser({ userName: elementoUsuario.user, id_rol: elementoRol.id, rol: elementoRol.rol, name: elementoUsuario.name }))
                        : <></>
                })
            )
            : (

                dispatch(getEmpleados({ userName: userName, userPassword: userPassword, dataRol: dataRol, empleados: empleados }))
            )
    })

}

export const { setUser, getEmpleados, setDeleteLoginData } = getInfo.actions;
export const selectLoginData = (state) => state.loginUser.loginData;
export default getInfo.reducer;
