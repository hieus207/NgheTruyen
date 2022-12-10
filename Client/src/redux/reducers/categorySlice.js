import {createSlice} from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
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
            state.data = state.data.concat(action.payload)
        },
        createCategoryFailure: (state, action)=>{
            state.isLoading = false
        }
    }

})