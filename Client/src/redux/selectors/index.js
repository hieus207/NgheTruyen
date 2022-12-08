import { createSelector } from "@reduxjs/toolkit"


export const storiesState = (state)=>state.story.data;
// export const someSelector = createSelector(otherSelector,(state,abc)=>{return state})