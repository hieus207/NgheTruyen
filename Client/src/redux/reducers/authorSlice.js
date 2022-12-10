import {createSlice} from "@reduxjs/toolkit"

export const authorSlice = createSlice({
    name: 'author',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        getAuthorsRequest: (state, action)=>{
            state.isLoading = true
        },
        getAuthorsSuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getAuthorsFailure: (state, action)=>{
            state.isLoading = false
        },
        createAuthorRequest: (state, action)=>{
            state.isLoading = true
        },
        createAuthorSuccess: (state, action)=>{
            state.isLoading = false
            state.data = state.data.concat(action.payload)
        },
        createAuthorFailure: (state, action)=>{
            state.isLoading = false
        }
    }

})