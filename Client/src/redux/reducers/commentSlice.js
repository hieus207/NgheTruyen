import {createSlice} from "@reduxjs/toolkit"

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        getCommentsStoryRequest: (state, action)=>{
            state.isLoading = true
        },
        getCommentsStorySuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getCommentsStoryFailure: (state, action)=>{
            state.isLoading = false
        },
        createCommentRequest: (state, action)=>{
            state.isLoading = true
        },
        createCommentSuccess: (state, action)=>{
            state.isLoading = false
            state.data = state.data.concat(action.payload)
        },
        createCommentFailure: (state, action)=>{
            state.isLoading = false
        },
        createSubCommentRequest: (state, action)=>{
            state.isLoading = true
        },
        createSubCommentSuccess: (state, action)=>{
            state.isLoading = false
            state.data = state.data.concat(action.payload)
        },
        createSubCommentFailure: (state, action)=>{
            state.isLoading = false
        },
    }

})