import axios from './axios'

export const getBooks = (params) => axios.get('/books', { params }).then(r => r.data.data)
export const getBook = (id) => axios.get(`/books/${id}`).then(r => r.data.data)
export const createBook = (data) => axios.post('/books', data).then(r => r.data.data)
export const updateBook = (id, data) => axios.put(`/books/${id}`, data).then(r => r.data.data)
export const deleteBook = (id) => axios.delete(`/books/${id}`).then(r => r.data.data)
export const toggleBook = (id) => axios.patch(`/books/${id}/toggle`).then(r => r.data.data)