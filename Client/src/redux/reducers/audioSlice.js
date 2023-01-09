import {createSlice} from "@reduxjs/toolkit"

export const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        name: "",
        played: true,
        playing: false,
        id: "",
        chapter: [],
        chapterId: 0,
        close: true
    },
    reducers: {
        play: (state, action) =>{   
            state.close = false
            state.name = action.payload.name
            if(state.id !== action.payload.id){
                state.id = action.payload.id
                state.chapter = action.payload.chapter
                state.chapterId = action.payload.chapterId
                state.played = false  
            }else{
                if(state.chapterId !== action.payload.chapterId){
                    state.chapterId = action.payload.chapterId
                }
                state.played = false
            }
        },
        played: (state, action) =>{
            state.playing = true
            state.played = true
        },
        pause: (state, action) => {
            state.playing = false
        },
        resume: (state) => {
            state.played = false
        },
        close: (state) => {
            state.close = true
            state.playing = false
        }
    }
})