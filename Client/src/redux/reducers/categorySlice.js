import {createSlice} from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        data: [],
        story: []
    },
    reducers: {
        getCategoryStoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getCategoryStoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.story = action.payload
        },
        getCategoryStoriesFailure: (state, action)=>{
            state.isLoading = false
        },
        getCategoriesRequest: (state, action)=>{
            state.isLoading = true
        },
        getCategoriesSuccess: (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        },
        getCategoriesFailure: (state, action)=>{
            state.isLoading = false
        },
        createCategoryRequest: (state, action)=>{
            state.isLoading = true
        },
        createCategorySuccess: (state, action)=>{
            state.isLoading = false
        },
        createCategoryFailure: (state, action)=>{
            state.isLoading = false
        },
        updateCategoryRequest: (state, action)=>{
            state.isLoading = true
        },
        updateCategorySuccess: (state, action)=>{
            state.isLoading = false
        },
        updateCategoryFailure: (state, action)=>{
            state.isLoading = false
        },
        deleteCategoryRequest: (state, action)=>{
            state.isLoading = true
        },
        deleteCategorySuccess: (state, action)=>{
            state.isLoading = false
        },
        deleteCategoryFailure: (state, action)=>{
            state.isLoading = false
        }
    }

})