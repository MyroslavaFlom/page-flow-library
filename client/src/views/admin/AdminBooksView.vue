<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Управління книгами</h1>
      <button @click="openForm(null)"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Додати книгу
      </button>
    </div>

    <div class="flex gap-4 mb-6 border-b pb-3">
      <RouterLink to="/admin/books" class="text-blue-600 font-medium">Книги</RouterLink>
      <RouterLink to="/admin/authors" class="text-gray-500 hover:text-blue-600">Автори</RouterLink>
      <RouterLink to="/admin/categories" class="text-gray-500 hover:text-blue-600">Категорії</RouterLink>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Назва</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Автор</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Категорія</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Статус</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 font-medium">{{ book.title }}</td>
            <td class="px-4 py-3 text-gray-600">
              {{ book.author?.firstName }} {{ book.author?.lastName }}
            </td>
            <td class="px-4 py-3 text-gray-600">{{ book.category?.name }}</td>
            <td class="px-4 py-3">
              <span :class="book.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                class="px-2 py-0.5 rounded-full text-xs">
                {{ book.isActive ? 'Активна' : 'Неактивна' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button @click="openForm(book)" class="text-blue-600 hover:text-blue-800 text-sm">Редагувати</button>
                <button @click="handleToggle(book)" class="text-yellow-600 hover:text-yellow-800 text-sm">
                  {{ book.isActive ? 'Деактивувати' : 'Активувати' }}
                </button>
                <button @click="handleDelete(book._id)" class="text-red-500 hover:text-red-700 text-sm">Видалити</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BookForm :show="showForm" :book="selectedBook" @close="showForm = false" @saved="onSaved" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBooks, deleteBook, toggleBook } from '@/api/books.api'
import BookForm from '@/components/BookForm.vue'

const books = ref([])
const showForm = ref(false)
const selectedBook = ref(null)

async function loadBooks() {
  const data = await getBooks({ limit: 100 })
  books.value = data.books
}

function openForm(book) {
  selectedBook.value = book
  showForm.value = true
}

async function handleDelete(id) {
  if (!confirm('Видалити книгу?')) return
  await deleteBook(id)
  await loadBooks()
}

async function handleToggle(book) {
  await toggleBook(book._id)
  await loadBooks()
}

function onSaved() {
  showForm.value = false
  loadBooks()
}

onMounted(loadBooks)
</script>