<template>
  <div>
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Бібліотечний ресурсний центр</h1>
      <p class="text-gray-500 mb-8">Знаходьте та читайте найкращі книги</p>
      <RouterLink to="/books"
        class="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 text-lg">
        Переглянути каталог
      </RouterLink>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-6">Нові надходження</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BookCard v-for="book in recentBooks" :key="book._id" :book="book" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookCard from '@/components/BookCard.vue'
import { getBooks } from '@/api/books.api'

const recentBooks = ref([])
onMounted(async () => {
  const data = await getBooks({ limit: 4, page: 1 })
  recentBooks.value = data.books
})
</script>