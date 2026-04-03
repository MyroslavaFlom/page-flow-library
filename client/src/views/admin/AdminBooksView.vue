<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1 style="font-size: 1.8rem; color: var(--text-primary);">Управління книгами</h1>
      <button @click="openForm(null)" style="
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background 0.2s;
      "
      @mouseover="e => e.target.style.background = 'var(--accent-hover)'"
      @mouseleave="e => e.target.style.background = 'var(--accent)'">
        + Додати книгу
      </button>
    </div>

    <!-- Навігація -->
    <div style="display: flex; gap: 24px; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
      <RouterLink to="/admin/books" style="color: var(--accent-hover); border-bottom: 2px solid var(--accent); padding-bottom: 12px; font-size: 0.95rem;">Книги</RouterLink>
      <RouterLink to="/admin/authors" style="color: var(--text-muted); font-size: 0.95rem;">Автори</RouterLink>
      <RouterLink to="/admin/categories" style="color: var(--text-muted); font-size: 0.95rem;">Категорії</RouterLink>
    </div>

    <div style="
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      overflow: hidden;
    ">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: var(--bg-elevated);">
            <th style="text-left: left; padding: 12px 16px; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; text-align: left;">Назва</th>
            <th style="padding: 12px 16px; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; text-align: left;">Автор</th>
            <th style="padding: 12px 16px; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; text-align: left;">Категорія</th>
            <th style="padding: 12px 16px; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; text-align: left;">Статус</th>
            <th style="padding: 12px 16px; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; text-align: left;">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id"
            style="border-bottom: 1px solid var(--border-subtle); transition: background 0.15s;"
            @mouseover="e => e.currentTarget.style.background = 'var(--bg-elevated)'"
            @mouseleave="e => e.currentTarget.style.background = 'transparent'">
            <td style="padding: 14px 16px; color: var(--text-primary); font-weight: 500;">{{ book.title }}</td>
            <td style="padding: 14px 16px; color: var(--text-secondary);">
              {{ book.author?.firstName }} {{ book.author?.lastName }}
            </td>
            <td style="padding: 14px 16px; color: var(--text-secondary);">{{ book.category?.name }}</td>
            <td style="padding: 14px 16px;">
              <span :style="book.isActive
                ? 'background: rgba(34,197,94,0.15); color: #86efac; border: 1px solid rgba(34,197,94,0.3);'
                : 'background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3);'"
                style="padding: 3px 10px; border-radius: 6px; font-size: 0.75rem;">
                {{ book.isActive ? 'Активна' : 'Неактивна' }}
              </span>
            </td>
            <td style="padding: 14px 16px;">
              <div style="display: flex; gap: 12px;">
                <button @click="openForm(book)" style="background: none; border: none; color: var(--accent-hover); cursor: pointer; font-size: 0.85rem; font-family: 'Nunito', sans-serif;">Редагувати</button>
                <button @click="handleToggle(book)" style="background: none; border: none; color: #fbbf24; cursor: pointer; font-size: 0.85rem; font-family: 'Nunito', sans-serif;">
                  {{ book.isActive ? 'Деактивувати' : 'Активувати' }}
                </button>
                <button @click="handleDelete(book._id)" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 0.85rem; font-family: 'Nunito', sans-serif;">Видалити</button>
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