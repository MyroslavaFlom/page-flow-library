import axios from './axios'
export const getAuthors = () => axios.get('/authors').then(r => r.data.data)
export const createAuthor = (data) => axios.post('/authors', data).then(r => r.data.data)
export const updateAuthor = (id, data) => axios.put(`/authors/${id}`, data).then(r => r.data.data)
export const deleteAuthor = (id) => axios.delete(`/authors/${id}`).then(r => r.data.data)
export const toggleAuthor = (id) => axios.patch(`/authors/${id}/toggle`).then(r => r.data.data)