import {createSlice} from "@reduxjs/toolkit"

export const authorSlice = createSlice({
    name: 'author',
    initialState: {
        isLoading: false,
        data: [],
        story: []
    },
    reducers: {
        getAuthorStoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getAuthorStoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.story = action.payload
        },
        getAuthorStoriesFailure: (state, action)=>{
            state.isLoading = false
        },
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
        },
        updateAuthorRequest: (state, action)=>{
            state.isLoading = true
        },
        updateAuthorSuccess: (state, action)=>{
            state.isLoading = false
        },
        updateAuthorFailure: (state, action)=>{
            state.isLoading = false
        },
        deleteAuthorRequest: (state, action)=>{
            state.isLoading = true
        },
        deleteAuthorSuccess: (state, action)=>{
            state.isLoading = false
        },
        deleteAuthorFailure: (state, action)=>{
            state.isLoading = false
        },
    }

})