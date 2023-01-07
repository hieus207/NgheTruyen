import {all} from "redux-saga/effects"
import commentSaga from "./commentSaga"
import authorSaga from "./authorSaga"
import categorySaga from "./categorySaga"
import tellerSaga from "./tellerSaga"
import storySaga from "./storySaga"

function* mySaga() {
    yield all([
        commentSaga(),
        authorSaga(),
        categorySaga(),
        tellerSaga(),
        storySaga()
    ])
}

export default mySaga