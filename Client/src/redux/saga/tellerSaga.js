import {takeLatest, call, put} from "redux-saga/effects"
import * as api from "../../api"
import { tellerSlice } from "../reducers/tellerSlice"



function* fetchTellerStoriesSaga(action){
    try {
        const stories = yield call(api.fetchTellerStories, action.payload)
        yield put(tellerSlice.actions.getTellersStoriesSuccess(stories.data))
    } catch (error) {
        yield put(tellerSlice.actions.getTellersStoriesFailure(error))
    }
}

function* fetchTellersSaga(action){
    try {
        const tellers = yield call(api.fetchTellers, action.payload)
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

function* updateTellerSaga(action){
    try {
        const teller = yield call(api.putUpdateTeller, action.payload)
        yield put(tellerSlice.actions.createTellerSuccess(teller.data))
    } catch (error) {
        yield put(tellerSlice.actions.createTellerFailure(error))
    }
}

function* deleteTellerSaga(action){
    try {
        yield call(api.deleteTeller, action.payload)
        yield put(tellerSlice.actions.createTellerSuccess())
    } catch (error) {
        yield put(tellerSlice.actions.createTellerFailure(error))
    }
}

function* tellerSaga(){
    yield takeLatest(tellerSlice.actions.getTellersStoriesRequest, fetchTellerStoriesSaga)
    yield takeLatest(tellerSlice.actions.getTellersRequest, fetchTellersSaga)
    yield takeLatest(tellerSlice.actions.createTellerRequest, createTellerSaga)
    yield takeLatest(tellerSlice.actions.updateTellerRequest, updateTellerSaga)
    yield takeLatest(tellerSlice.actions.deleteTellerRequest, deleteTellerSaga)
}

export default tellerSaga