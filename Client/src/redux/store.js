import { configureStore  } from "@reduxjs/toolkit"
import { storyAudioSlice } from "../components/pages/Story/storyAudioSlice"
import createSagaMiddleware from 'redux-saga';
import rootSaga from './mySaga';
import { storySlice } from "./reducers/storySlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        audio: storyAudioSlice.reducer,
        story: storySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store