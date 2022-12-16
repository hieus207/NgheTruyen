import { createSelector } from "@reduxjs/toolkit"



export const storiesState = (state) => state.story.data;
export const storiesRandomState = (state) => state.story.random;
export const storiesMostViewState = (state) => state.story.mostview;
export const storiesRecentState = (state) => state.story.recent;
export const tellersState = (state) => state.teller.data;
export const tellerStoriesState = (state) => state.teller.story;
export const authorsState = (state) => state.author.data;
export const authorStoriesState = (state) => state.author.story;

export const categoriesState = (state) => state.category.data;
export const categoryStoriesState = (state) => state.category.story;

export const commentsState = (state) => state.comment.data;

export const userState = (state) => state.user
// export const someSelector = createSelector(otherSelector,(state,abc)=>{return state})