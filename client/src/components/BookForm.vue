<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          {{ book ? 'Редагувати книгу' : 'Додати книгу' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <input v-model="form.title" placeholder="Назва *"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <select v-model="form.author"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Оберіть автора *</option>
            <option v-for="a in authors" :key="a._id" :value="a._id">
              {{ a.firstName }} {{ a.lastName }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="form.category"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Оберіть категорію *</option>
            <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
          </select>
        </div>
        <div>
          <textarea v-model="form.description" placeholder="Опис" rows="3"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <input v-model="form.isbn" placeholder="ISBN"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <input v-model.number="form.publishedYear" type="number" placeholder="Рік видання"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <input v-model="form.coverUrl" placeholder="URL обкладинки"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </div>

      <div class="flex gap-3 mt-6">
        <button @click="$emit('close')"
          class="flex-1 border rounded-lg py-2 hover:bg-gray-50">
          Скасувати
        </button>
        <button @click="handleSubmit" :disabled="loading"
          class="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-50">
          {{ loading ? 'Збереження...' : 'Зберегти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { createBook, updateBook } from '@/api/books.api'
import { getAuthors } from '@/api/authors.api'
import { getCategories } from '@/api/categories.api'

const props = defineProps({ book: Object, show: Boolean })
const emit = defineEmits(['close', 'saved'])

const authors = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref('')

const form = ref({ title: '', author: '', category: '', description: '', isbn: '', publishedYear: '', coverUrl: '' })

onMounted(async () => {
  const [aData, cData] = await Promise.all([getAuthors(), getCategories()])
  authors.value = aData.authors
  categories.value = cData.categories
})

watch(() => props.book, (val) => {
  if (val) {
    form.value = {
      title: val.title || '',
      author: val.author?._id || val.author || '',
      category: val.category?._id || val.category || '',
      description: val.description || '',
      isbn: val.isbn || '',
      publishedYear: val.publishedYear || '',
      coverUrl: val.coverUrl || '',
    }
  } else {
    form.value = { title: '', author: '', category: '', description: '', isbn: '', publishedYear: '', coverUrl: '' }
  }
}, { immediate: true })

async function handleSubmit() {
  error.value = ''
  if (!form.value.title) { error.value = 'Введіть назву'; return }
  if (!form.value.author) { error.value = 'Оберіть автора'; return }
  if (!form.value.category) { error.value = 'Оберіть категорію'; return }

  loading.value = true
  try {
    if (props.book) {
      await updateBook(props.book._id, form.value)
    } else {
      await createBook(form.value)
    }
    emit('saved')
  } catch (e) {
    error.value = e.response?.data?.message || 'Помилка збереження'
  } finally {
    loading.value = false
  }
}
</script>