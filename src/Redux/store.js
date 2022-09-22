import { configureStore } from '@reduxjs/toolkit'

import loginUser from "./StoreComponents/login"
import employee from "./StoreComponents/addEmployeeStore"
import tipoDeVacunas from './StoreComponents/storeTipoDeVacunas'

export default configureStore({
    reducer: {
        loginUser: loginUser,
        employee: employee,
        tipoDeVacunas: tipoDeVacunas,
    },
})