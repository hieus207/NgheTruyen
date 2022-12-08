import axios from 'axios'

const URL = "http://localhost:5000"

export const fetchStories = ()=> axios.get(`${URL}/stories`);