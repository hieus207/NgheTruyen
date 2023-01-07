import { configureStore  } from "@reduxjs/toolkit"
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/mySaga';
import { storySlice } from "./reducers/storySlice";
import { tellerSlice } from "./reducers/tellerSlice";
import { authorSlice } from "./reducers/authorSlice";
import { categorySlice } from "./reducers/categorySlice";
import { commentSlice } from "./reducers/commentSlice";
import { userSlice } from "./reducers/userSlice";
import { audioSlice } from "./reducers/audioSlice";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        story: storySlice.reducer,
        teller: tellerSlice.reducer,
        author: authorSlice.reducer,
        category: categorySlice.reducer,
        comment: commentSlice.reducer,
        user: userSlice.reducer,
        audio: audioSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store