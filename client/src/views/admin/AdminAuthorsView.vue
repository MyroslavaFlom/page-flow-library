<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Управління авторами</h1>
      <button @click="openForm(null)"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Додати автора
      </button>
    </div>

    <div class="flex gap-4 mb-6 border-b pb-3">
      <RouterLink to="/admin/books" class="text-gray-500 hover:text-blue-600">Книги</RouterLink>
      <RouterLink to="/admin/authors" class="text-blue-600 font-medium">Автори</RouterLink>
      <RouterLink to="/admin/categories" class="text-gray-500 hover:text-blue-600">Категорії</RouterLink>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Ім'я</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Прізвище</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Статус</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 font-medium">{{ author.firstName }}</td>
            <td class="px-4 py-3 text-gray-600">{{ author.lastName }}</td>
            <td class="px-4 py-3">
              <span :class="author.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                class="px-2 py-0.5 rounded-full text-xs">
                {{ author.isActive ? 'Активний' : 'Неактивний' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button @click="openForm(author)" class="text-blue-600 hover:text-blue-800 text-sm">Редагувати</button>
                <button @click="handleToggle(author)" class="text-yellow-600 hover:text-yellow-800 text-sm">
                  {{ author.isActive ? 'Деактивувати' : 'Активувати' }}
                </button>
                <button @click="handleDelete(author._id)" class="text-red-500 hover:text-red-700 text-sm">Видалити</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модал -->
    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ selectedAuthor ? 'Редагувати автора' : 'Додати автора' }}</h2>
          <button @click="showForm = false" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div class="flex flex-col gap-4">
          <input v-model="form.firstName" placeholder="Ім'я *"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="form.lastName" placeholder="Прізвище *"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea v-model="form.bio" placeholder="Біографія" rows="3"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showForm = false" class="flex-1 border rounded-lg py-2 hover:bg-gray-50">Скасувати</button>
          <button @click="handleSubmit" :disabled="formLoading"
            class="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-50">
            {{ formLoading ? 'Збереження...' : 'Зберегти' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuthors, createAuthor, updateAuthor, deleteAuthor, toggleAuthor } from '@/api/authors.api'

const authors = ref([])
const showForm = ref(false)
const selectedAuthor = ref(null)
const form = ref({ firstName: '', lastName: '', bio: '' })
const formError = ref('')
const formLoading = ref(false)

async function loadAuthors() {
  const data = await getAuthors()
  authors.value = data.authors
}

function openForm(author) {
  selectedAuthor.value = author
  form.value = author
    ? { firstName: author.firstName, lastName: author.lastName, bio: author.bio || '' }
    : { firstName: '', lastName: '', bio: '' }
  showForm.value = true
}

async function handleSubmit() {
  formError.value = ''
  if (!form.value.firstName || !form.value.lastName) {
    formError.value = "Введіть ім'я та прізвище"
    return
  }
  formLoading.value = true
  try {
    if (selectedAuthor.value) {
      await updateAuthor(selectedAuthor.value._id, form.value)
    } else {
      await createAuthor(form.value)
    }
    showForm.value = false
    await loadAuthors()
  } catch (e) {
    formError.value = e.response?.data?.message || 'Помилка збереження'
  } finally {
    formLoading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('Видалити автора?')) return
  await deleteAuthor(id)
  await loadAuthors()
}

async function handleToggle(author) {
  await toggleAuthor(author._id)
  await loadAuthors()
}

onMounted(loadAuthors)
</script>