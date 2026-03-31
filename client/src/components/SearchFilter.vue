<template>
  <div class="flex flex-wrap gap-3">
    <input
      :value="modelValue.search"
      @input="update('search', $event.target.value)"
      type="text"
      placeholder="Пошук за назвою..."
      class="border rounded-lg px-4 py-2 flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select
      :value="modelValue.category"
      @change="update('category', $event.target.value)"
      class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Всі категорії</option>
      <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
    </select>

    <select
      :value="modelValue.author"
      @change="update('author', $event.target.value)"
      class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Всі автори</option>
      <option v-for="a in authors" :key="a._id" :value="a._id">
        {{ a.firstName }} {{ a.lastName }}
      </option>
    </select>

    <button
      @click="reset"
      class="border rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
    >
      Скинути фільтри
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '@/api/categories.api'
import { getAuthors } from '@/api/authors.api'

const props = defineProps({ modelValue: Object })
const emit = defineEmits(['update:modelValue'])

const categories = ref([])
const authors = ref([])

onMounted(async () => {
  const [cData, aData] = await Promise.all([getCategories(), getAuthors()])
  categories.value = cData.categories
  authors.value = aData.authors
})

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function reset() {
  emit('update:modelValue', { search: '', category: '', author: '' })
}
</script>