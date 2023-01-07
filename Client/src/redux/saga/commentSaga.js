import {takeLatest, call, put} from "redux-saga/effects"
import * as api from "../../api"
import { commentSlice } from "../reducers/commentSlice"

function* fetchCommentsStorySaga(action){
    try {
        const comments = yield call(api.fetchCommentsStory, action.payload)
        yield put(commentSlice.actions.getCommentsStorySuccess(comments.data))
    } catch (error) {
        yield put(commentSlice.actions.getCommentsStoryFailure(error))
    }
}

function* createCommentSaga(action){
    try {
        const comment = yield call(api.postCreateComment, action.payload)
        yield put(commentSlice.actions.createCommentSuccess(comment.data))
    } catch (error) {
        yield put(commentSlice.actions.createCommentFailure(error))
    }
}

function* createSubCommentSaga(action){
    try {
        const subComment = yield call(api.postCreateSubComment, action.payload)
        yield put(commentSlice.actions.createSubCommentSuccess(subComment.data))
    } catch (error) {
        yield put(commentSlice.actions.createSubCommentFailure(error))
    }
}

function* commentSaga() {
    yield takeLatest(commentSlice.actions.getCommentsStoryRequest, fetchCommentsStorySaga)
    yield takeLatest(commentSlice.actions.createCommentRequest, createCommentSaga)
    yield takeLatest(commentSlice.actions.createSubCommentRequest, createSubCommentSaga)
}   

export default commentSaga