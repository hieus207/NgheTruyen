import { api } from ".";

export const login = (body) => api.call().post(`/auth/login`,body)
export const logout = (body) => api.call().post(`/auth/logout`,body)
export const refreshToken = (body) => api.call().post(`/auth/refreshToken`,body)
