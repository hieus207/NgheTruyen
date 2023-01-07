import { api } from ".";

export const fetchStory = (id) => api.call().get(`/stories/${id}`);
export const fetchStories = ({...params}) => api.call().get("/stories",{ params})
export const fetchStoriesRandom = ({...params}) => api.call().get("/stories/random",{ params})
export const fetchStoriesMostView = ({...params}) => api.call().get("/stories/mostview",{ params})
export const fetchStoriesRecent = ({...params}) => api.call().get("/stories/recent",{ params})
export const postCreateStory = (body) => api.call().post(`/stories`, body)
export const putUpdateStory = (body) => api.call().put(`/stories`, body)
export const deleteStory = (id) => api.call().delete(`/stories/${id}`)
export const postAddChapter = (body) => api.call().post(`/stories/chapter`, body)
export const putEditChapter = (body) => api.call().put(`/stories/chapter`, body)
export const deleteChapter = ({id,chapterIndex}) => api.call().delete(`/stories/${id}/chapter/${chapterIndex}`)