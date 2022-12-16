import { configureStore  } from "@reduxjs/toolkit"
import { storyAudioSlice } from "../components/pages/Story/storyAudioSlice"
import createSagaMiddleware from 'redux-saga';
import rootSaga from './mySaga';
import { storySlice } from "./reducers/storySlice";
import { tellerSlice } from "./reducers/tellerSlice";
import { authorSlice } from "./reducers/authorSlice";
import { categorySlice } from "./reducers/categorySlice";
import { commentSlice } from "./reducers/commentSlice";
import { userSlice } from "./reducers/userSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        story: storySlice.reducer,
        teller: tellerSlice.reducer,
        author: authorSlice.reducer,
        category: categorySlice.reducer,
        comment: commentSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store