<template>
  <div class="max-w-md mx-auto mt-16 bg-white rounded-xl shadow p-8 text-center">
    <div v-if="status === 'loading'" class="text-gray-500">
      Перевірка...
    </div>

    <div v-else-if="status === 'success'" class="text-green-600">
      <div class="text-5xl mb-4">✓</div>
      <p class="text-lg font-medium">{{ message }}</p>
      <p class="text-sm text-gray-500 mt-2">Перехід на сторінку входу...</p>
    </div>

    <div v-else class="text-red-600">
      <div class="text-5xl mb-4">✗</div>
      <p class="text-lg font-medium">{{ message }}</p>
      <RouterLink to="/register" class="text-blue-600 hover:underline text-sm mt-4 inline-block">
        Зареєструватись знову
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { verifyEmail } from '@/api/auth.api'

const route = useRoute()
const router = useRouter()
const status = ref('loading')
const message = ref('')

onMounted(async () => {
  try {
    await verifyEmail(route.params.token)
    status.value = 'success'
    message.value = 'Email підтверджено! Тепер можете увійти.'
    setTimeout(() => router.push('/login'), 3000)
  } catch (e) {
    status.value = 'error'
    message.value = e.response?.data?.message || 'Токен недійсний або прострочений'
  }
})
</script>