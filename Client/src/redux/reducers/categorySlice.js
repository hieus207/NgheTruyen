import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isSuccess: {
        getCategoryStories: 0,
        getCategories: 0,
        createCategory: 0,
        updateCategory: 0,
        deleteCategory: 0
    },
    data: {
        local:[],
        all:[]
    },
    story: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        getCategoryStoriesRequest: (state, action)=>{
            state.isSuccess.getCategoryStories = 0
        },
        getCategoryStoriesSuccess: (state, action)=>{
            state.isSuccess.getCategoryStories = 1
            state.story = action.payload
        },
        getCategoryStoriesFailure: (state, action)=>{
            state.isSuccess.getCategoryStories = 2
        },
        getCategoriesRequest: (state, action)=>{
            state.isSuccess.getCategories = 0
        },
        getCategoriesSuccess: (state, action)=>{
            state.isSuccess.getCategories = 1
            state.data.local = action.payload
        },
        getCategoriesFailure: (state, action)=>{
            state.isSuccess.getCategories = 2
        },
        createCategoryRequest: (state, action)=>{
            state.isSuccess.createCategory = 0
        },
        createCategorySuccess: (state, action)=>{
            state.isSuccess.createCategory = 1
        },
        createCategoryFailure: (state, action)=>{
            state.isSuccess.createCategory = 2
        },
        updateCategoryRequest: (state, action)=>{
            state.isSuccess.updateCategory = 0
        },
        updateCategorySuccess: (state, action)=>{
            state.isSuccess.updateCategory = 1
        },
        updateCategoryFailure: (state, action)=>{
            state.isSuccess.updateCategory = 2
        },
        deleteCategoryRequest: (state, action)=>{
            state.isSuccess.deleteCategory = 0
        },
        deleteCategorySuccess: (state, action)=>{
            state.isSuccess.deleteCategory = 1
        },
        deleteCategoryFailure: (state, action)=>{
            state.isSuccess.deleteCategory = 2
        },
        resetIsSuccess: (state) =>{
            state.isSuccess = initialState.isSuccess
        },
        storeLocalToAll: (state) =>{
            if(state.data.all.length < state.data.local.length) //Giải pháp tình thế!
            state.data.all = state.data.local
        }
    }

})