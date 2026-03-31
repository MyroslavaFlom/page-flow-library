<template>
  <div class="max-w-md mx-auto mt-16 bg-white rounded-xl shadow p-8">
    <h1 class="text-2xl font-bold text-center mb-6">Вхід</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <input
        v-model="form.email"
        type="email"
        placeholder="Ваш email"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Завантаження...' : 'Увійти' }}
      </button>
    </form>

    <p class="text-center text-sm text-gray-500 mt-4">
      Немає акаунту?
      <RouterLink to="/register" class="text-blue-600 hover:underline">Зареєструватись</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { login } from '@/api/auth.api'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!form.value.email || !/^\S+@\S+\.\S+$/.test(form.value.email)) {
    error.value = 'Введіть коректний email'
    return
  }
  if (!form.value.password) {
    error.value = 'Введіть пароль'
    return
  }
  loading.value = true
  try {
    const data = await login(form.value)
    authStore.setAuth(data.token, data.user)
    if (data.user.role === 'admin') {
      router.push('/admin/books')
    } else {
      router.push('/')
    }
  } catch (e) {
    error.value = e.response?.data?.message || 'Помилка входу'
  } finally {
    loading.value = false
  }
}
</script>