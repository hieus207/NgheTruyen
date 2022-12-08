import {createSlice} from "@reduxjs/toolkit"

export const storySlice = createSlice({
    name: 'story',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        getStoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getStoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getStoriesFailure: (state, action)=>{
            state.isLoading = false
        }
    }

})