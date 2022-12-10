import axios from 'axios'

const URL = "http://localhost:5000"

export const fetchStories = ()=> axios.get(`${URL}/stories`);
export const fetchTellers = ()=> axios.get(`${URL}/tellers`);
export const fetchAuthors = ()=> axios.get(`${URL}/authors`);
export const fetchCategories = ()=> axios.get(`${URL}/categories`);

export const postCreateStory = (body)=> axios.post(`${URL}/stories`,body)
export const postCreateTeller = (body)=> axios.post(`${URL}/tellers`,body)
export const postCreateAuthor = (body)=> axios.post(`${URL}/authors`,body)
export const postCreateCategory = (body)=> axios.post(`${URL}/categories`,body)

