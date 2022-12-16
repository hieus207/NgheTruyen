import axios from 'axios'

const URL = "http://localhost:5000"

export const login = (body) => axios.post(`${URL}/auth/login`,body)
export const logout = (body) => axios.post(`${URL}/auth/logout`,body)
export const refreshToken = (body) => axios.post(`${URL}/auth/refreshToken`,body)

export const fetchStory = (id) => axios.get(`${URL}/stories/${id}`);
export const fetchStories = ({name=null, page=1}) => axios.get(`${URL}/stories`, { params: { name , page } })
export const fetchStoriesRandom = () => axios.get(`${URL}/stories/random`);
export const fetchStoriesMostView = () => axios.get(`${URL}/stories/mostview`);
export const fetchStoriesRecent = () => axios.get(`${URL}/stories/recent`);
export const postCreateStory = (body) => axios.post(`${URL}/stories`, body)
export const putUpdateStory = (body) => axios.put(`${URL}/stories`,body)
export const deleteStory = (id) => axios.delete(`${URL}/stories/${id}`);


export const fetchTellerStories = (id) => axios.get(`${URL}/tellers/${id}`);
export const fetchTellers = ({page = 1}) => axios.get(`${URL}/tellers`,{ params: {  page } });
export const postCreateTeller = (body)=> axios.post(`${URL}/tellers`,body)
export const putUpdateTeller = (body)=> axios.put(`${URL}/tellers`,body)
export const deleteTeller = (id)=> axios.delete(`${URL}/tellers/${id}`);


export const fetchAuthorStories = (id)=> axios.get(`${URL}/authors/${id}`);
export const fetchAuthors = ()=> axios.get(`${URL}/authors`);
export const postCreateAuthor = (body)=> axios.post(`${URL}/authors`,body)
export const putUpdateAuthor = (body)=> axios.put(`${URL}/authors`,body)
export const deleteAuthor = (id)=> axios.delete(`${URL}/authors/${id}`);


export const fetchCategoryStories = (id)=> axios.get(`${URL}/categories/${id}`);
export const fetchCategories = ()=> axios.get(`${URL}/categories`);
export const postCreateCategory = (body)=> axios.post(`${URL}/categories`,body)
export const putUpdateCategory = (body)=> axios.put(`${URL}/categories`,body)
export const deleteCategory = (id)=> axios.delete(`${URL}/categories/${id}`);

export const fetchCommentsStory = (id)=> axios.get(`${URL}/comments/${id}`);
export const postCreateComment = (body)=> axios.post(`${URL}/comments`,body)
export const postCreateSubComment = (body)=> axios.post(`${URL}/comments/reply`,body)

