import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs : []
}

export const favSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers:{
        add: (state, action) => {
            const pokemon = action.payload
            if(!state.favs.some((item) => item.id == pokemon.id)){
                state.favs.push(pokemon)
                return state
            }
        },
        remove: (state, action) => {
            const pokemon = action.payload
            state.favs = state.favs.filter((item) => item.id !== pokemon.id)
            return state
        },
        clearOut: (state) => {
            state.favs = []
            return state
        }
    }
})

export const { add, remove, clearOut } = favSlice.actions;
export default favSlice.reducer