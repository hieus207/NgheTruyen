import { api } from ".";

export const fetchCategories = ({...params}) => api.call().get("/categories",{ params})
export const fetchCategoryStories = ({id,...params}) => api.call().get(`/categories/${id}`,{ params})
export const postCreateCategory = (body) => api.call().post(`/categories`, body)
export const putUpdateCategory = (body) => api.call().put(`/categories`, body)
export const deleteCategory = (id) => api.call().delete(`/categories/${id}`);