import axios from './axios'

export const login = (data) => axios.post('/auth/login', data).then(r => r.data.data)
export const register = (data) => axios.post('/auth/register', data).then(r => r.data.data)
export const verifyEmail = (token) => axios.get(`/auth/verify-email/${token}`).then(r => r.data.data)
export const getMe = () => axios.get('/auth/me').then(r => r.data.data)