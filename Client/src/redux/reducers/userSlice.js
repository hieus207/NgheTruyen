import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        data: []
    },
    reducers: {
        loggedIn(state, action){
            state.isLoggedIn = true
            state.data = action.payload
        },
        loggedOut(state, action){
            state.isLoggedIn = false
            state.data = []
        }
    }
})