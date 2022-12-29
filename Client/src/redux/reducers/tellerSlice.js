import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isSuccess: {
        getTellersStories: 0,
        getTellers: 0,
        createTeller: 0,
        updateTeller: 0,
        deleteTeller: 0
    },
    data: [],
    story: []
}

export const tellerSlice = createSlice({
    name: 'teller',
    initialState: initialState,
    reducers: {
        getTellersStoriesRequest: (state, action)=>{
            state.isSuccess.getTellersStories = 0
        },
        getTellersStoriesSuccess: (state, action)=>{
            state.isSuccess.getTellersStories = 1
            state.story = action.payload
        },
        getTellersStoriesFailure: (state, action)=>{
            state.isSuccess.getTellersStories = 2
        },
        getTellersRequest: (state, action)=>{
            state.isSuccess.getTellers = 0
        },
        getTellersSuccess: (state, action)=>{
            state.isSuccess.getTellers = 1
            state.data = action.payload
        },
        getTellersFailure: (state, action)=>{
            state.isSuccess.getTellers = 2
        },
        createTellerRequest: (state, action)=>{
            state.isSuccess.createTeller = 0
        },
        createTellerSuccess: (state, action)=>{
            state.isSuccess.createTeller = 1
        },
        createTellerFailure: (state, action)=>{
            state.isSuccess.createTeller = 2
        },
        updateTellerRequest: (state, action)=>{
            state.isSuccess.updateTeller = 0
        },
        updateTellerSuccess: (state, action)=>{
            state.isSuccess.updateTeller = 1
        },
        updateTellerFailure: (state, action)=>{
            state.isSuccess.updateTeller = 2
        },
        deleteTellerRequest: (state, action)=>{
            state.isSuccess.deleteTeller = 0
        },
        deleteTellerSuccess: (state, action)=>{
            state.isSuccess.deleteTeller = 1
        },
        deleteTellerFailure: (state, action)=>{
            state.isSuccess.deleteTeller = 2
        },
        resetIsSuccess: (state) =>{
            state.isSuccess = initialState.isSuccess
        }
    }

})