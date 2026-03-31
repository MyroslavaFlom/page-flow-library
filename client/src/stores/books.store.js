import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as booksApi from '@/api/books.api'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])
  const total = ref(0)
  const page = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)
  const lastParams = ref({})
  const lastUpdated = ref('')
  let pollingTimer = null

  async function fetchBooks(params = {}) {
    loading.value = true
    lastParams.value = params
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

  async function silentRefresh() {
    try {
      const data = await booksApi.getBooks(lastParams.value)
      if (
        data.total !== total.value ||
        JSON.stringify(data.books.map(b => b._id + b.isActive)) !==
        JSON.stringify(books.value.map(b => b._id + b.isActive))
      ) {
        books.value = data.books
        total.value = data.total
        totalPages.value = data.totalPages
      }
      lastUpdated.value = new Date().toLocaleTimeString('uk-UA')
    } catch {
      // тихо ігноруємо помилки при polling
    }
  }

  function startPolling(intervalMs = 10000) {
    stopPolling()
    pollingTimer = setInterval(silentRefresh, intervalMs)
  }

  function stopPolling() {
    if (pollingTimer) {
      clearInterval(pollingTimer)
      pollingTimer = null
    }
  }

  return {
    books, total, page, totalPages, loading, lastUpdated,
    fetchBooks, startPolling, stopPolling,
  }
})