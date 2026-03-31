<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Управління категоріями</h1>
      <button @click="openForm(null)"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Додати категорію
      </button>
    </div>

    <div class="flex gap-4 mb-6 border-b pb-3">
      <RouterLink to="/admin/books" class="text-gray-500 hover:text-blue-600">Книги</RouterLink>
      <RouterLink to="/admin/authors" class="text-gray-500 hover:text-blue-600">Автори</RouterLink>
      <RouterLink to="/admin/categories" class="text-blue-600 font-medium">Категорії</RouterLink>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Назва</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Опис</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Статус</th>
            <th class="text-left px-4 py-3 text-sm font-medium text-gray-600">Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 font-medium">{{ category.name }}</td>
            <td class="px-4 py-3 text-gray-600 max-w-xs truncate">{{ category.description }}</td>
            <td class="px-4 py-3">
              <span :class="category.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                class="px-2 py-0.5 rounded-full text-xs">
                {{ category.isActive ? 'Активна' : 'Неактивна' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button @click="openForm(category)" class="text-blue-600 hover:text-blue-800 text-sm">Редагувати</button>
                <button @click="handleToggle(category)" class="text-yellow-600 hover:text-yellow-800 text-sm">
                  {{ category.isActive ? 'Деактивувати' : 'Активувати' }}
                </button>
                <button @click="handleDelete(category._id)" class="text-red-500 hover:text-red-700 text-sm">Видалити</button>
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
          <h2 class="text-xl font-semibold">{{ selectedCategory ? 'Редагувати категорію' : 'Додати категорію' }}</h2>
          <button @click="showForm = false" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div class="flex flex-col gap-4">
          <input v-model="form.name" placeholder="Назва *"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea v-model="form.description" placeholder="Опис" rows="3"
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
import { getCategories, createCategory, updateCategory, deleteCategory, toggleCategory } from '@/api/categories.api'

const categories = ref([])
const showForm = ref(false)
const selectedCategory = ref(null)
const form = ref({ name: '', description: '' })
const formError = ref('')
const formLoading = ref(false)

async function loadCategories() {
  const data = await getCategories()
  categories.value = data.categories
}

function openForm(category) {
  selectedCategory.value = category
  form.value = category
    ? { name: category.name, description: category.description || '' }
    : { name: '', description: '' }
  showForm.value = true
}

async function handleSubmit() {
  formError.value = ''
  if (!form.value.name) {
    formError.value = 'Введіть назву'
    return
  }
  formLoading.value = true
  try {
    if (selectedCategory.value) {
      await updateCategory(selectedCategory.value._id, form.value)
    } else {
      await createCategory(form.value)
    }
    showForm.value = false
    await loadCategories()
  } catch (e) {
    formError.value = e.response?.data?.message || 'Помилка збереження'
  } finally {
    formLoading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('Видалити категорію?')) return
  await deleteCategory(id)
  await loadCategories()
}

async function handleToggle(category) {
  await toggleCategory(category._id)
  await loadCategories()
}

onMounted(loadCategories)
</script>