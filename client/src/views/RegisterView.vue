<template>
  <div class="max-w-md mx-auto mt-16 bg-white rounded-xl shadow p-8">
    <h1 class="text-2xl font-bold text-center mb-6">Реєстрація</h1>

    <div v-if="success" class="text-center text-green-600">
      <p class="text-lg font-medium">Реєстрація успішна!</p>
      <p class="mt-2 text-sm text-gray-600">
        Перевірте email <strong>{{ form.email }}</strong> та натисніть посилання для підтвердження.
      </p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <input
        v-model="form.firstName"
        placeholder="Ім'я"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="form.lastName"
        placeholder="Прізвище"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Пароль (мінімум 6 символів)"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="form.passwordConfirm"
        type="password"
        placeholder="Повторіть пароль"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Завантаження...' : 'Зареєструватись' }}
      </button>
    </form>

    <p class="text-center text-sm text-gray-500 mt-4">
      Вже є акаунт?
      <RouterLink to="/login" class="text-blue-600 hover:underline">Увійти</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { register } from '@/api/auth.api'

const form = ref({ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '' })
const error = ref('')
const loading = ref(false)
const success = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!form.value.firstName || !form.value.lastName) {
    error.value = "Введіть ім'я та прізвище"
    return
  }
  if (!form.value.email || !/^\S+@\S+\.\S+$/.test(form.value.email)) {
    error.value = 'Введіть коректний email'
    return
  }
  if (form.value.password.length < 6) {
    error.value = 'Пароль має бути мінімум 6 символів'
    return
  }
  if (form.value.password !== form.value.passwordConfirm) {
    error.value = 'Паролі не збігаються'
    return
  }
  loading.value = true
  try {
    const { firstName, lastName, email, password } = form.value
    await register({ firstName, lastName, email, password })
    success.value = true
  } catch (e) {
    error.value = e.response?.data?.message || 'Помилка реєстрації'
  } finally {
    loading.value = false
  }
}
</script>