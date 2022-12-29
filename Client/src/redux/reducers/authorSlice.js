import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isSuccess: {
        getAuthorStories: 0,
        getAuthors: 0,
        createAuthor: 0,
        updateAuthor: 0,
        deleteAuthor: 0
    },
    data: [],
    story: []
}
export const authorSlice = createSlice({
    name: 'author',
    initialState: initialState,
    reducers: {
        getAuthorStoriesRequest: (state, action)=>{
            state.isSuccess.getAuthorStories = 0
        },
        getAuthorStoriesSuccess: (state, action)=>{
            state.isSuccess.getAuthorStories = 1
            state.story = action.payload
        },
        getAuthorStoriesFailure: (state, action)=>{
            state.isSuccess.getAuthorStories = 2
        },
        getAuthorsRequest: (state, action)=>{
            state.isSuccess.getAuthors = 0
        },
        getAuthorsSuccess: (state, action)=>{
            state.isSuccess.getAuthors = 1
            state.data = action.payload
        },
        getAuthorsFailure: (state, action)=>{
            state.isSuccess.getAuthors = 2
        },
        createAuthorRequest: (state, action)=>{
            state.isSuccess.createAuthor = 0
        },
        createAuthorSuccess: (state, action)=>{
            state.isSuccess.createAuthor = 1
        },
        createAuthorFailure: (state, action)=>{
            state.isSuccess.createAuthor = 2
        },
        updateAuthorRequest: (state, action)=>{
            state.isSuccess.updateAuthor = 0
        },
        updateAuthorSuccess: (state, action)=>{
            state.isSuccess.updateAuthor = 1
        },
        updateAuthorFailure: (state, action)=>{
            state.isSuccess.updateAuthor = 2
        },
        deleteAuthorRequest: (state, action)=>{
            state.isSuccess.deleteAuthor = 0
        },
        deleteAuthorSuccess: (state, action)=>{
            state.isSuccess.deleteAuthor = 1
        },
        deleteAuthorFailure: (state, action)=>{
            state.isSuccess.deleteAuthor = 2
        },
        resetIsSuccess: (state) =>{
            state.isSuccess = initialState.isSuccess
        }
    }

})