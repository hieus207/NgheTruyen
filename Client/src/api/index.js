import axios from 'axios'

const URL = "http://localhost:5000"

export const login = (body) => axios.post(`${URL}/auth/login`,body)
export const logout = (body) => axios.post(`${URL}/auth/logout`,body)
export const refreshToken = (body) => axios.post(`${URL}/auth/refreshToken`,body)

export const fetchStory = (id) => axios.get(`${URL}/stories/${id}`);
export const fetchStories = ({name=null, page=1}) => axios.get(`${URL}/stories`, { params: { name , page } })
export const fetchStoriesRandom = () => axios.get(`${URL}/stories/random`);
export const fetchStoriesMostView = ({page=1, limit}) => axios.get(`${URL}/stories/mostview`,{ params: {  page, [limit?"limit":{}]:limit?limit:{} }});
export const fetchStoriesRecent = ({page=1, limit}) => axios.get(`${URL}/stories/recent`,{ params: {  page, [limit?"limit":{}]:limit?limit:{} }});
export const postCreateStory = (body) => axios.post(`${URL}/stories`, body)
export const putUpdateStory = (body) => axios.put(`${URL}/stories`,body)
export const deleteStory = (id) => axios.delete(`${URL}/stories/${id}`)
export const postAddChapter = (body) => axios.post(`${URL}/stories/chapter`, body)
export const putEditChapter = (body) => axios.put(`${URL}/stories/chapter`,body)
export const deleteChapter = ({id,chapterIndex}) => axios.delete(`${URL}/stories/${id}/chapter/${chapterIndex}`)


export const fetchTellerStories = ({id,page = 1}) => axios.get(`${URL}/tellers/${id}`,{ params: {  page } });
export const fetchTellers = ({page = 1,all = false}) => axios.get(`${URL}/tellers`,{ params: {  page , [all?"all":{}]:all?all:{} }});
export const postCreateTeller = (body)=> axios.post(`${URL}/tellers`,body)
export const putUpdateTeller = (body)=> axios.put(`${URL}/tellers`,body)
export const deleteTeller = (id)=> axios.delete(`${URL}/tellers/${id}`);


export const fetchAuthorStories = ({id,page = 1})=> axios.get(`${URL}/authors/${id}`,{ params: {  page } });
export const fetchAuthors = ({page = 1, all = false})=> axios.get(`${URL}/authors`,{ params: {  page, [all?"all":{}]:all?all:{} } });
export const postCreateAuthor = (body)=> axios.post(`${URL}/authors`,body)
export const putUpdateAuthor = (body)=> axios.put(`${URL}/authors`,body)
export const deleteAuthor = (id)=> axios.delete(`${URL}/authors/${id}`);


export const fetchCategoryStories = ({id,page = 1})=> axios.get(`${URL}/categories/${id}`,{ params: {  page } });
export const fetchCategories = ({page = 1, all = false})=> axios.get(`${URL}/categories`,{ params: {  page, [all?"all":{}]:all?all:{} } });
export const postCreateCategory = (body)=> axios.post(`${URL}/categories`,body)
export const putUpdateCategory = (body)=> axios.put(`${URL}/categories`,body)
export const deleteCategory = (id)=> axios.delete(`${URL}/categories/${id}`);

export const fetchCommentsStory = (id)=> axios.get(`${URL}/comments/${id}`);
export const postCreateComment = (body)=> axios.post(`${URL}/comments`,body)
export const postCreateSubComment = (body)=> axios.post(`${URL}/comments/reply`,body)

