import {createSlice} from "@reduxjs/toolkit"

export const storyAudioSlice = createSlice({
    name: 'audio',
    initialState: {
        url: '',
        playing: false,
        source: ''
    },
    reducers: {
        urlAudioChange: (state,action)=>{
            state.url = action.payload
        }
    }

})