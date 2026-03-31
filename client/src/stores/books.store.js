import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as booksApi from '@/api/books.api'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])
  const total = ref(0)
  const page = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)

  async function fetchBooks(params = {}) {
    loading.value = true
    try {
      const data = await booksApi.getBooks(params)
      books.value = data.books
      total.value = data.total
      page.value = data.page
      totalPages.value = data.totalPages
    } finally {
      loading.value = false
    }
  }

  return { books, total, page, totalPages, loading, fetchBooks }
})