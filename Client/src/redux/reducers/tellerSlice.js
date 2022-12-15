import {createSlice} from "@reduxjs/toolkit"

export const tellerSlice = createSlice({
    name: 'teller',
    initialState: {
        isLoading: false,
        data: [],
        story: []
    },
    reducers: {
        getTellersStoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getTellersStoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.story = action.payload
        },
        getTellersStoriesFailure: (state, action)=>{
            state.isLoading = false
        },
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
        },
        updateTellerRequest: (state, action)=>{
            state.isLoading = true
        },
        updateTellerSuccess: (state, action)=>{
            state.isLoading = false
        },
        updateTellerFailure: (state, action)=>{
            state.isLoading = false
        },
        deleteTellerRequest: (state, action)=>{
            state.isLoading = true
        },
        deleteTellerSuccess: (state, action)=>{
            state.isLoading = false
        },
        deleteTellerFailure: (state, action)=>{
            state.isLoading = false
        }
    }

})