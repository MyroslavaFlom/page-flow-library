<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <input
      :value="modelValue.search"
      @input="update('search', $event.target.value)"
      type="text"
      placeholder="Пошук за назвою..."
      style="
        flex: 1; min-width: 200px;
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 10px 16px;
        color: var(--text-primary);
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s;
      "
      @focus="e => e.target.style.borderColor = 'var(--accent)'"
      @blur="e => e.target.style.borderColor = 'var(--border-subtle)'"
    />

    <select
      :value="modelValue.category"
      @change="update('category', $event.target.value)"
      style="
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 10px 16px;
        color: var(--text-primary);
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s;
      "
      @focus="e => e.target.style.borderColor = 'var(--accent)'"
      @blur="e => e.target.style.borderColor = 'var(--border-subtle)'"
    >
      <option value="" style="background: var(--bg-elevated);">Всі категорії</option>
      <option v-for="c in categories" :key="c._id" :value="c._id" style="background: var(--bg-elevated);">
        {{ c.name }}
      </option>
    </select>

    <select
      :value="modelValue.author"
      @change="update('author', $event.target.value)"
      style="
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 10px 16px;
        color: var(--text-primary);
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s;
      "
      @focus="e => e.target.style.borderColor = 'var(--accent)'"
      @blur="e => e.target.style.borderColor = 'var(--border-subtle)'"
    >
      <option value="" style="background: var(--bg-elevated);">Всі автори</option>
      <option v-for="a in authors" :key="a._id" :value="a._id" style="background: var(--bg-elevated);">
        {{ a.firstName }} {{ a.lastName }}
      </option>
    </select>

    <button
      @click="reset"
      style="
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        color: var(--text-secondary);
        border-radius: 10px;
        padding: 10px 16px;
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s;
      "
      @mouseover="e => e.target.style.borderColor = 'var(--border)'"
      @mouseleave="e => e.target.style.borderColor = 'var(--border-subtle)'"
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