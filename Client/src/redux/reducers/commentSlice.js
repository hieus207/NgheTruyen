import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isSuccess: {
        getCommentsStory: 0,
        createComment: 0,
        createSubComment: 0
    },
    data: []
}
export const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        getCommentsStoryRequest: (state, action)=>{
            state.isSuccess.getCommentsStory = 0
        },
        getCommentsStorySuccess: (state, action)=>{
            state.isSuccess.getCommentsStory = 1
            state.data = action.payload
        },
        getCommentsStoryFailure: (state, action)=>{
            state.isSuccess.getCommentsStory = 2
        },
        createCommentRequest: (state, action)=>{
            state.isSuccess.createComment = 0
        },
        createCommentSuccess: (state, action)=>{
            state.isSuccess.createComment = 1
        },
        createCommentFailure: (state, action)=>{
            state.isSuccess.createComment = 2
        },
        createSubCommentRequest: (state, action)=>{
            state.isSuccess.createSubComment = 0
        },
        createSubCommentSuccess: (state, action)=>{
            state.isSuccess.createSubComment = 1
        },
        createSubCommentFailure: (state, action)=>{
            state.isSuccess.createSubComment = 2
        },
        resetIsSuccess: (state) =>{
            state.isSuccess = initialState.isSuccess
        }
    }

})