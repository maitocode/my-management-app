/**
 * Redux store,
 * identify that only one element of
 * contact item will be shown on the time
 */
import { createSlice } from '@reduxjs/toolkit'
import { setUserLocal } from '../../services/localStorage';
import { removeUserLocal } from '../../services/localStorage';

let initialUser: string | null = null
if (localStorage.getItem("user") !== null)
    initialUser = localStorage.getItem("user")

export const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        user: initialUser,
        loading: false
    },
    reducers: {
        loginSuccess: (state, action) => {
            const { payload } = action;
            state.user = payload.user
            setUserLocal(payload.session_token, payload.user)
        },
        logoutSuccess: (state) => {
            state.user = null;
            removeUserLocal();
        },
    },
},
)

export const { loginSuccess, logoutSuccess } = contactSlice.actions;

export default contactSlice.reducer;