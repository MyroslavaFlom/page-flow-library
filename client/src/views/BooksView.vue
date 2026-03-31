<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Каталог книг</h1>

    <SearchFilter v-model="filters" class="mb-6" />

    <div v-if="booksStore.lastUpdated" class="text-xs text-gray-400 text-right mb-2">
      Оновлено: {{ booksStore.lastUpdated }}
    </div>

    <div v-if="booksStore.loading" class="text-center py-12 text-gray-400">
      Завантаження...
    </div>

    <div v-else-if="booksStore.books.length === 0" class="text-center py-12 text-gray-400">
      Книг не знайдено
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <BookCard v-for="book in booksStore.books" :key="book._id" :book="book" />
    </div>

    <Pagination
      v-if="booksStore.totalPages > 1"
      :page="booksStore.page"
      :totalPages="booksStore.totalPages"
      @change="currentPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useBooksStore } from '@/stores/books.store'
import BookCard from '@/components/BookCard.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import Pagination from '@/components/Pagination.vue'

const booksStore = useBooksStore()

const filters = ref({ search: '', category: '', author: '' })
const currentPage = ref(1)

async function loadBooks() {
  await booksStore.fetchBooks({
    ...filters.value,
    page: currentPage.value,
    limit: 12,
  })
}

watch(filters, () => {
  currentPage.value = 1
  loadBooks()
}, { deep: true })

watch(currentPage, loadBooks)

onMounted(() => {
  loadBooks()
  booksStore.startPolling(10000)
})

onUnmounted(() => {
  booksStore.stopPolling()
})
</script>