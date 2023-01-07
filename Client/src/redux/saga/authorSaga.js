import {takeLatest, call, put} from "redux-saga/effects"
import { authorSlice } from "../reducers/authorSlice"
import * as api from "../../api"

function* fetchAuthorStoriesSaga(action){
    try {
        const stories = yield call(api.fetchAuthorStories,action.payload)
        yield put(authorSlice.actions.getAuthorStoriesSuccess(stories.data))
    } catch (error) {
        yield put(authorSlice.actions.getAuthorStoriesFailure(error))
    }
}

function* fetchAuthorsSaga(action){
    try {
        const authors = yield call(api.fetchAuthors, action.payload)
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

function* updateAuthorSaga(action){
    try {
        const author = yield call(api.putUpdateAuthor, action.payload)
        yield put(authorSlice.actions.createAuthorSuccess(author.data))
    } catch (error) {
        yield put(authorSlice.actions.createAuthorFailure(error))
    }
}

function* deleteAuthorSaga(action){
    try {
        yield call(api.deleteAuthor, action.payload)
        yield put(authorSlice.actions.createAuthorSuccess())
    } catch (error) {
        yield put(authorSlice.actions.createAuthorFailure(error))
    }
}

function* authorSaga(){
    yield takeLatest(authorSlice.actions.getAuthorStoriesRequest, fetchAuthorStoriesSaga)
    yield takeLatest(authorSlice.actions.getAuthorsRequest, fetchAuthorsSaga)
    yield takeLatest(authorSlice.actions.createAuthorRequest, createAuthorSaga)
    yield takeLatest(authorSlice.actions.updateAuthorRequest, updateAuthorSaga)
    yield takeLatest(authorSlice.actions.deleteAuthorRequest, deleteAuthorSaga)
}

export default authorSaga