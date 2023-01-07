import { api } from ".";

export const fetchTellers = ({...params}) => api.call().get("/tellers",{ params})
export const fetchTellerStories = ({id,...params}) => api.call().get(`/tellers/${id}`,{ params})
export const postCreateTeller = (body) => api.call().post(`/tellers`, body)
export const putUpdateTeller = (body) => api.call().put(`/tellers`, body)
export const deleteTeller = (id) => api.call().delete(`/tellers/${id}`);

