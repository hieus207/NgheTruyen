import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isSuccess: {
        getStory: 0,
        getStories: 0,
        getStoriesRandom: 0,
        getStoriesMostView: 0,
        getStoriesRecent: 0,
        createStory: 0,
        updateStory: 0,
        deleteStory: 0,
        addChapter: 0,
        editChapter: 0,
        deleteChapter: 0
    },
    data: [],
    random: [],
    recent: [],
    mostview: []
}

export const storySlice = createSlice({
    name: 'story',
    initialState: initialState,
    reducers: {
        getStoryRequest: (state, action)=>{
            state.isSuccess.getStory = 0
        },
        getStorySuccess: (state, action)=>{
            state.isSuccess.getStory = 1
            state.data = action.payload
        },
        getStoryFailure: (state, action)=>{
            state.isSuccess.getStory = 2
        },
        getStoriesRequest: (state, action)=>{
            state.isSuccess.getStories = 0
        },
        getStoriesSuccess: (state, action)=>{
            state.isSuccess.getStories = 1
            state.data = action.payload
        },
        getStoriesFailure: (state, action)=>{
            state.isSuccess.getStories = 2
        },
        getStoriesRandomRequest: (state, action)=>{
            state.isSuccess.getStoriesRandom = 0
        },
        getStoriesRandomSuccess: (state, action)=>{
            state.isSuccess.getStoriesRandom = 1
            state.random = action.payload
        },
        getStoriesRandomFailure: (state, action)=>{
            state.isSuccess.getStoriesRandom = 2
        },
        getStoriesMostViewRequest: (state, action)=>{
            state.isSuccess.getStoriesMostView = 0
        },
        getStoriesMostViewSuccess: (state, action)=>{
            state.isSuccess.getStoriesMostView = 1
            state.mostview = action.payload
        },
        getStoriesMostViewFailure: (state, action)=>{
            state.isSuccess.getStoriesMostView = 2
        },
        getStoriesRecentRequest: (state, action)=>{
            state.isSuccess.getStoriesRecent = 0
        },
        getStoriesRecentSuccess: (state, action)=>{
            state.isSuccess.getStoriesRecent = 1
            state.recent = action.payload
        },
        getStoriesRecentFailure: (state, action)=>{
            state.isSuccess.getStoriesRecent = 2
        },
        createStoryRequest: (state, action)=>{
            state.isSuccess.createStory = 0
        },
        createStorySuccess: (state, action)=>{
            state.isSuccess.createStory = 1
        },
        createStoryFailure: (state, action)=>{
            state.isSuccess.createStory = 2
        },
        updateStoryRequest: (state, action)=>{
            state.isSuccess.updateStory = 0
        },
        updateStorySuccess: (state, action)=>{
            state.isSuccess.updateStory = 1
        },
        updateStoryFailure: (state, action)=>{
            state.isSuccess.updateStory = 2
        },
        deleteStoryRequest: (state, action)=>{
            state.isSuccess.deleteStory =  0
        },
        deleteStorySuccess: (state, action)=>{
            state.isSuccess.deleteStory = 1
        },
        deleteStoryFailure: (state, action)=>{
            state.isSuccess.deleteStory = 2
        },
        addChapterRequest: (state, action) => {
            state.isSuccess.addChapter = 0
        },
        addChapterSuccess: (state, action) => {
            state.isSuccess.addChapter = 1
        },
        addChapterFailure: (state, action) => {
            state.isSuccess.addChapter = 2
        },
        editChapterRequest: (state, action) => {
            state.isSuccess.editChapter = 0
        },
        editChapterSuccess: (state, action) => {
            state.isSuccess.editChapter = 1
        },
        editChapterFailure: (state, action) => {
            state.isSuccess.editChapter = 2
        },
        deleteChapterRequest: (state, action) => {
            state.isSuccess.deleteChapter = 0
        },
        deleteChapterSuccess: (state, action) => {
            state.isSuccess.deleteChapter = 1
        },
        deleteChapterFailure: (state, action) => {
            state.isSuccess.deleteChapter = 2
        },
        resetIsSuccess: (state) =>{
            state.isSuccess = initialState.isSuccess
        }
    }

})