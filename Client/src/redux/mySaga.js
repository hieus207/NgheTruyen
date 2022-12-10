import {takeLatest, call, put} from "redux-saga/effects"
import { storySlice } from "./reducers/storySlice"
import * as api from "../api"
import { tellerSlice } from "./reducers/tellerSlice"
import { authorSlice } from "./reducers/authorSlice"
import { categorySlice } from "./reducers/categorySlice"
function* fetchStoriesSaga(action){
    try {
        const stories = yield call(api.fetchStories)
        console.log('stories',stories)
        yield put(storySlice.actions.getStoriesSuccess(stories.data))
    } catch (error) {
        yield put(storySlice.actions.getStoriesFailure(error))
    }
}

function* createStorySaga(action){
    try {
        const story = yield call(api.postCreateStory, action.payload)
 
        yield put(storySlice.actions.createStorySuccess(story.data))
    } catch (error) {
        yield put(storySlice.actions.createStoryFailure(error))
    }
}

function* fetchTellersSaga(action){
    try {
        const tellers = yield call(api.fetchTellers)
        yield put(tellerSlice.actions.getTellersSuccess(tellers.data))
    } catch (error) {
        yield put(tellerSlice.actions.getTellersFailure(error))
    }
}

function* createTellerSaga(action){
    try {
        const teller = yield call(api.postCreateTeller, action.payload)
        yield put(tellerSlice.actions.createTellerSuccess(teller.data))
    } catch (error) {
        yield put(tellerSlice.actions.createTellerFailure(error))
    }
}

function* fetchAuthorsSaga(action){
    try {
        const authors = yield call(api.fetchAuthors)
        yield put(authorSlice.actions.getAuthorsSuccess(authors.data))
    } catch (error) {
        yield put(authorSlice.actions.getAuthorsFailure(error))
    }
}

function* createAuthorSaga(action){
    try {
        const author = yield call(api.postCreateAuthor, action.payload)
        yield put(authorSlice.actions.createAuthorSuccess(author.data))
    } catch (error) {
        yield put(authorSlice.actions.createAuthorFailure(error))
    }
}

function* fetchCategoriesSaga(action){
    try {
        const categories = yield call(api.fetchCategories)
        yield put(categorySlice.actions.getCategoriesSuccess(categories.data))
    } catch (error) {
        yield put(categorySlice.actions.getCategoriesFailure(error))
    }
}

function* createCategorySaga(action){
    try {
        const category = yield call(api.postCreateCategory, action.payload)
        yield put(categorySlice.actions.createCategorySuccess(category.data))
    } catch (error) {
        yield put(categorySlice.actions.createCategoryFailure(error))
    }
}


function* mySaga() {
    yield takeLatest(storySlice.actions.getStoriesRequest, fetchStoriesSaga)
    yield takeLatest(storySlice.actions.createStoryRequest, createStorySaga)
    
    yield takeLatest(tellerSlice.actions.getTellersRequest, fetchTellersSaga)
    yield takeLatest(tellerSlice.actions.createTellerRequest, createTellerSaga)

    yield takeLatest(authorSlice.actions.getAuthorsRequest, fetchAuthorsSaga)
    yield takeLatest(authorSlice.actions.createAuthorRequest, createAuthorSaga)

    yield takeLatest(categorySlice.actions.getCategoriesRequest, fetchCategoriesSaga)
    yield takeLatest(categorySlice.actions.createCategoryRequest, createCategorySaga)
}

export default mySaga