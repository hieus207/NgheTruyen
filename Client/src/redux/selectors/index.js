import { createSelector } from "@reduxjs/toolkit"


export const storiesState = (state) => state.story.data;
export const tellersState = (state) => state.teller.data;
export const authorsState = (state) => state.author.data;
export const categoriesState = (state) => state.category.data;
// export const someSelector = createSelector(otherSelector,(state,abc)=>{return state})