import axios from './axios'
export const getCategories = () => axios.get('/categories').then(r => r.data.data)
export const createCategory = (data) => axios.post('/categories', data).then(r => r.data.data)
export const updateCategory = (id, data) => axios.put(`/categories/${id}`, data).then(r => r.data.data)
export const deleteCategory = (id) => axios.delete(`/categories/${id}`).then(r => r.data.data)
export const toggleCategory = (id) => axios.patch(`/categories/${id}/toggle`).then(r => r.data.data)
