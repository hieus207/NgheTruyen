import {takeLatest, call, put} from "redux-saga/effects"
import { storySlice } from "./reducers/storySlice"
import * as api from "../api"
import { tellerSlice } from "./reducers/tellerSlice"
import { authorSlice } from "./reducers/authorSlice"
import { categorySlice } from "./reducers/categorySlice"
import { commentSlice } from "./reducers/commentSlice"

// CRUD STORY==========
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
        const stories = yield call(api.fetchStoriesRandom)
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
        const story = yield call(api.deleteStory, action.payload)
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
        const story = yield call(api.deleteChapter, action.payload)
        yield put(storySlice.actions.deleteChapterSuccess())
    } catch (error) {
        yield put(storySlice.actions.deleteChapterFailure(error))
    }
}

// CRUD TELLER ==============
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


// CRUD AUTHOR ------------------------
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



// CRUD CATEGORY -----------------------------
function* fetchCategoryStoriesSaga(action){
    try {
        const stories = yield call(api.fetchCategoryStories, action.payload)
        yield put(categorySlice.actions.getCategoryStoriesSuccess(stories.data))
    } catch (error) {
        yield put(categorySlice.actions.getCategoryStoriesFailure(error))
    }
}

function* fetchCategoriesSaga(action){
    try {
        const categories = yield call(api.fetchCategories, action.payload)
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

function* updateCategorySaga(action){
    try {
        const category = yield call(api.putUpdateCategory, action.payload)
        yield put(categorySlice.actions.updateCategorySuccess(category.data))
    } catch (error) {
        yield put(categorySlice.actions.updateCategoryFailure(error))
    }
}

function* deleteCategorySaga(action){
    try {
        yield call(api.deleteCategory, action.payload)
        yield put(categorySlice.actions.deleteCategorySuccess())
    } catch (error) {
        yield put(categorySlice.actions.deleteCategoryFailure(error))
    }
}


// CRUD COMMENT ------------------------------
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


function* mySaga() {
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
    
    yield takeLatest(tellerSlice.actions.getTellersStoriesRequest, fetchTellerStoriesSaga)
    yield takeLatest(tellerSlice.actions.getTellersRequest, fetchTellersSaga)
    yield takeLatest(tellerSlice.actions.createTellerRequest, createTellerSaga)
    yield takeLatest(tellerSlice.actions.updateTellerRequest, updateTellerSaga)
    yield takeLatest(tellerSlice.actions.deleteTellerRequest, deleteTellerSaga)

    yield takeLatest(authorSlice.actions.getAuthorStoriesRequest, fetchAuthorStoriesSaga)
    yield takeLatest(authorSlice.actions.getAuthorsRequest, fetchAuthorsSaga)
    yield takeLatest(authorSlice.actions.createAuthorRequest, createAuthorSaga)
    yield takeLatest(authorSlice.actions.updateAuthorRequest, updateAuthorSaga)
    yield takeLatest(authorSlice.actions.deleteAuthorRequest, deleteAuthorSaga)

    yield takeLatest(categorySlice.actions.getCategoryStoriesRequest, fetchCategoryStoriesSaga)
    yield takeLatest(categorySlice.actions.getCategoriesRequest, fetchCategoriesSaga)
    yield takeLatest(categorySlice.actions.createCategoryRequest, createCategorySaga)
    yield takeLatest(categorySlice.actions.updateCategoryRequest, updateCategorySaga)
    yield takeLatest(categorySlice.actions.deleteCategoryRequest, deleteCategorySaga)

    yield takeLatest(commentSlice.actions.getCommentsStoryRequest, fetchCommentsStorySaga)
    yield takeLatest(commentSlice.actions.createCommentRequest, createCommentSaga)
    yield takeLatest(commentSlice.actions.createSubCommentRequest, createSubCommentSaga)

}

export default mySaga