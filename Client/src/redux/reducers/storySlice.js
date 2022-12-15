import {createSlice} from "@reduxjs/toolkit"

export const storySlice = createSlice({
    name: 'story',
    initialState: {
        isLoading: false,
        data: [],
        random: [],
        recent: [],
        mostview: []
    },
    reducers: {
        getStoryRequest: (state, action)=>{
            state.isLoading = true
        },
        getStorySuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getStoryFailure: (state, action)=>{
            state.isLoading = false
        },
        getStoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getStoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getStoriesFailure: (state, action)=>{
            state.isLoading = false
        },
        getStoriesRandomRequest: (state, action)=>{
            state.isLoading = true
        },
        getStoriesRandomSuccess: (state, action)=>{
            state.isLoading = false
            state.random = action.payload
        },
        getStoriesRandomFailure: (state, action)=>{
            state.isLoading = false
        },
        getStoriesMostViewRequest: (state, action)=>{
            state.isLoading = true
        },
        getStoriesMostViewSuccess: (state, action)=>{
            state.isLoading = false
            state.mostview = action.payload
        },
        getStoriesMostViewFailure: (state, action)=>{
            state.isLoading = false
        },
        getStoriesRecentRequest: (state, action)=>{
            state.isLoading = true
        },
        getStoriesRecentSuccess: (state, action)=>{
            state.isLoading = false
            state.recent = action.payload
        },
        getStoriesRecentFailure: (state, action)=>{
            state.isLoading = false
        },
        createStoryRequest: (state, action)=>{
            state.isLoading = true
        },
        createStorySuccess: (state, action)=>{
            state.isLoading = false
            state.data = state.data.concat(action.payload)
        },
        createStoryFailure: (state, action)=>{
            state.isLoading = false
        },
        updateStoryRequest: (state, action)=>{
            state.isLoading = true
        },
        updateStorySuccess: (state, action)=>{
            state.isLoading = false
        },
        updateStoryFailure: (state, action)=>{
            state.isLoading = false
        },
        deleteStoryRequest: (state, action)=>{
            state.isLoading = true
        },
        deleteStorySuccess: (state, action)=>{
            state.isLoading = false
        },
        deleteStoryFailure: (state, action)=>{
            state.isLoading = false
        },
    }

})