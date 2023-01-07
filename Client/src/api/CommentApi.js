import { api } from ".";


export const fetchCommentsStory = (id) => api.call().get(`/comments/${id}`)
export const postCreateComment = (body) => api.call().post(`/comments`, body)
export const postCreateSubComment = (body) => api.call().post(`/comments/reply`, body)



