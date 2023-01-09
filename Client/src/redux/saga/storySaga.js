import {takeLatest, call, put} from "redux-saga/effects"
import * as api from "../../api"
import { storySlice } from "../reducers/storySlice"


function* fetchStorySaga(action){
    try {
        const story = yield call(api.fetchStory, action.payload)
        yield put(storySlice.actions.getStorySuccess(story.data))
    } catch (error) {
        yield put(storySlice.actions.getStoryFailure(error))
    }
}

function* fetchStoriesSaga(action){
    try {
        const stories = yield call(api.fetchStories,action.payload)
        yield put(storySlice.actions.getStoriesSuccess(stories.data))
    } catch (error) {
        yield put(storySlice.actions.getStoriesFailure(error))
    }
}

function* fetchStoriesRandomSaga(action){
    try {
        const stories = yield call(api.fetchStoriesRandom, action.payload)
        yield put(storySlice.actions.getStoriesRandomSuccess(stories.data))
    } catch (error) {
        yield put(storySlice.actions.getStoriesRandomFailure(error))
    }
}

function* fetchStoriesMostViewSaga(action){
    try {
        const stories = yield call(api.fetchStoriesMostView, action.payload)
        yield put(storySlice.actions.getStoriesMostViewSuccess(stories.data))
    } catch (error) {
        yield put(storySlice.actions.getStoriesMostViewFailure(error))
    }
}

function* fetchStoriesRecentSaga(action){
    try {
        const stories = yield call(api.fetchStoriesRecent, action.payload)
        yield put(storySlice.actions.getStoriesRecentSuccess(stories.data))
    } catch (error) {
        yield put(storySlice.actions.getStoriesRecentFailure(error))
    }
}

function* createStorySaga(action){
    try {
        const story = yield call(api.postCreateStory, action.payload)
 
        yield put(storySlice.actions.createStorySuccess(story.data))
    } catch (error) {
        console.log(error)
        yield put(storySlice.actions.createStoryFailure(error))
    }
}

function* updateStorySaga(action){
    try {
        const story = yield call(api.putUpdateStory, action.payload)
 
        yield put(storySlice.actions.updateStorySuccess(story.data))
    } catch (error) {
        yield put(storySlice.actions.updateStoryFailure(error))
    }
}

function* deleteStorySaga(action){
    try {
        yield call(api.deleteStory, action.payload)
        yield put(storySlice.actions.deleteStorySuccess())
    } catch (error) {
        yield put(storySlice.actions.deleteStoryFailure(error))
    }
}

function* addChapterSaga(action){
    try {
        const story = yield call(api.postAddChapter, action.payload)
 
        yield put(storySlice.actions.addChapterSuccess(story.data))
    } catch (error) {
        yield put(storySlice.actions.addChapterFailure(error))
    }
}

function* editChapterSaga(action){
    try {
        const story = yield call(api.putEditChapter, action.payload)
 
        yield put(storySlice.actions.editChapterSuccess(story.data))
    } catch (error) {
        yield put(storySlice.actions.editChapterFailure(error))
    }
}

function* deleteChapterSaga(action){
    try {
        yield call(api.deleteChapter, action.payload)
        yield put(storySlice.actions.deleteChapterSuccess())
    } catch (error) {
        yield put(storySlice.actions.deleteChapterFailure(error))
    }
}

function* storySaga(){
    yield takeLatest(storySlice.actions.getStoryRequest, fetchStorySaga)
    yield takeLatest(storySlice.actions.getStoriesRequest, fetchStoriesSaga)
    yield takeLatest(storySlice.actions.getStoriesRandomRequest, fetchStoriesRandomSaga)
    yield takeLatest(storySlice.actions.getStoriesMostViewRequest, fetchStoriesMostViewSaga)
    yield takeLatest(storySlice.actions.getStoriesRecentRequest, fetchStoriesRecentSaga)
    yield takeLatest(storySlice.actions.createStoryRequest, createStorySaga)
    yield takeLatest(storySlice.actions.updateStoryRequest, updateStorySaga)
    yield takeLatest(storySlice.actions.deleteStoryRequest, deleteStorySaga)
    yield takeLatest(storySlice.actions.addChapterRequest, addChapterSaga)
    yield takeLatest(storySlice.actions.editChapterRequest, editChapterSaga)
    yield takeLatest(storySlice.actions.deleteChapterRequest, deleteChapterSaga)
}

export default storySaga