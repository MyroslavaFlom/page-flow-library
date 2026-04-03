<template>
  <div>
    <div style="margin-bottom: 32px;">
      <h1 style="font-size: 2.2rem; color: var(--text-primary); margin-bottom: 8px;">
        Каталог книг
      </h1>
      <p style="color: var(--text-muted); font-size: 0.95rem;">
        {{ booksStore.total }} книг у колекції
      </p>
    </div>

    <SearchFilter v-model="filters" style="margin-bottom: 24px;" />

    <div v-if="booksStore.lastUpdated" style="
      text-align: right;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    ">
      Оновлено: {{ booksStore.lastUpdated }}
    </div>

    <div v-if="booksStore.loading" style="text-align: center; padding: 48px 0; color: var(--text-muted);">
      Завантаження...
    </div>

    <div v-else-if="booksStore.books.length === 0" style="text-align: center; padding: 48px 0; color: var(--text-muted);">
      Книг не знайдено
    </div>

    <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
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