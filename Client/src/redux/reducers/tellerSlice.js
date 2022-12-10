import {createSlice} from "@reduxjs/toolkit"

export const tellerSlice = createSlice({
    name: 'teller',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        getTellersRequest: (state, action)=>{
            state.isLoading = true
        },
        getTellersSuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getTellersFailure: (state, action)=>{
            state.isLoading = false
        },
        createTellerRequest: (state, action)=>{
            state.isLoading = true
        },
        createTellerSuccess: (state, action)=>{
            state.isLoading = false
            state.data = state.data.concat(action.payload)
        },
        createTellerFailure: (state, action)=>{
            state.isLoading = false
        }


    }

})