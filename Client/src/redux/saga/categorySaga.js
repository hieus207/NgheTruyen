import {takeLatest, call, put} from "redux-saga/effects"
import * as api from "../../api"
import { categorySlice } from "../reducers/categorySlice"



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

function* categorySaga(){
    yield takeLatest(categorySlice.actions.getCategoryStoriesRequest, fetchCategoryStoriesSaga)
    yield takeLatest(categorySlice.actions.getCategoriesRequest, fetchCategoriesSaga)
    yield takeLatest(categorySlice.actions.createCategoryRequest, createCategorySaga)
    yield takeLatest(categorySlice.actions.updateCategoryRequest, updateCategorySaga)
    yield takeLatest(categorySlice.actions.deleteCategoryRequest, deleteCategorySaga)
}

export default categorySaga
