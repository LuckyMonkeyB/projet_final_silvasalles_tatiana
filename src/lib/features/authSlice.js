import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    /*SUBSCRIBE */
    username: '',
    password:'',
    myUser: [],
    isSubscribed : false,

    /*LOGIN */
    usernameLogin:'',
    passwordLogin:'',
    user: {},
    isLogged: false

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        getIdentity: (state, action) => {
            state.username = action.payload;
            state.password = action.payload;
            return state
        },
        setSubscription: (state) => {
            if(state.username?.trim().length < 1 && state.password?.length < 1){
                alert('please complet the form')
            }else if(state.username?.trim().length > 0 && state.password?.length > 0){
                state.isSubscribed = true;
                state.myUser.push({username: state.username}, {password: state.password})
            }

            const info = state.myUser.find((i) => i.username === state.username)
            state.user = info
            state.username = ''
            return state
        },
        retrieve: (state, action) =>{
            state.usernameLogin = action.payload;
            state.passwordLogin = action.payload;
            return state
        },
        log: (state) => {
            const recup= state.myUser.find((i) => i.username === state.usernameLogin)

            if(recup !== undefined && recup.username === state.usernameLogin){
                alert('login successful')
                state.isLogged = true
                state.user = recup
            }
            return state
        },
        logout:(state) =>{
            state.username = '',
            state.password = '',
            state.isLogged = false
            state.isSubscribed = false
        }
    }

})


export const { getIdentity, setSubscription, retrieve, log, logout } = authSlice.actions;
export default authSlice.reducer