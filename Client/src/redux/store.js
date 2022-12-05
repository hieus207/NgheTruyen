import { configureStore } from "@reduxjs/toolkit"
import { storyAudioSlice } from "../components/pages/Story/storyAudioSlice"
const store = configureStore({
    reducer:{
        audio: storyAudioSlice.reducer
    }
})

export default store