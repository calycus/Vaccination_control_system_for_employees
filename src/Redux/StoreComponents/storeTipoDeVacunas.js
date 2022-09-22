
import { createSlice } from "@reduxjs/toolkit";

export const getInfo = createSlice({
    name: 'tipoDeVacunas',
    initialState: {
        vacunas: []
    },

    reducers: {
        setVacunas: (state, action) => {
            state.vacunas = []

            state.vacunas = action.payload
        },
    }
})
export const getDataVacunas = () => async (dispatch) => {
    const resVacunas = await fetch("/fake_api/vacunas.json", {
        method: "GET"
    })

    const dataVacunas = await resVacunas.json()

    dispatch(setVacunas(dataVacunas))
}


export const { setVacunas } = getInfo.actions;
export const selectVacunas = (state) => state.tipoDeVacunas.vacunas;
export default getInfo.reducer;
