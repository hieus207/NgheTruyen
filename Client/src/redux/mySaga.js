import {takeLatest, call, put} from "redux-saga/effects"
import { storySlice } from "./reducers/storySlice"
import * as api from "../api"
function* fetchStoriesSaga(action){
    const stories = yield call(api.fetchStories)
    console.log('stories',stories)
    yield put(storySlice.actions.getStoriesSuccess(stories.data))
}

function* mySaga() {
    yield takeLatest(storySlice.actions.getStoriesRequest, fetchStoriesSaga)
}

export default mySaga