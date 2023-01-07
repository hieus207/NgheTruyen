import { createSelector } from "@reduxjs/toolkit"



export const storiesState = (state) => state.story.data;
export const storiesSuccessState = (state) => state.story.isSuccess;
export const storiesRandomState = (state) => state.story.random;
export const storiesMostViewState = (state) => state.story.mostview;
export const storiesRecentState = (state) => state.story.recent;

export const tellersState = (state) => state.teller.data;
export const tellerSuccessState = (state) => state.teller.isSuccess;
export const tellerStoriesState = (state) => state.teller.story;

export const authorsState = (state) => state.author.data;
export const authorSuccessState = (state) => state.author.isSuccess;
export const authorStoriesState = (state) => state.author.story;

export const categoriesState = (state) => state.category.data.local;
export const allCategoriesState = (state) => state.category.data.all;
export const categorySuccessState = (state) => state.category.isSuccess;
export const categoryStoriesState = (state) => state.category.story;

export const commentsState = (state) => state.comment.data;
export const commentSuccessState = (state) => state.comment.isSuccess;

export const userState = (state) => state.user

export const audioState = (state) => state.audio