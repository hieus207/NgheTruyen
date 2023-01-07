import { api } from ".";

export const fetchAuthors = ({...params}) => api.call().get("/authors",{ params})
export const fetchAuthorStories = ({id, ...params}) => api.call().get(`/authors/${id}`,{ params})
export const postCreateAuthor = (body) => api.call().post(`/authors`, body)
export const putUpdateAuthor = (body) => api.call().put(`/authors`, body)
export const deleteAuthor = (id) => api.call().delete(`/authors/${id}`);