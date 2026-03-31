<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold text-blue-600">
        Бібліотека
      </RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink to="/books" class="text-gray-600 hover:text-blue-600">
          Книги
        </RouterLink>

        <template v-if="authStore.isAdmin">
          <RouterLink to="/admin/books" class="text-gray-600 hover:text-blue-600">
            Адмін
          </RouterLink>
        </template>

        <template v-if="authStore.isLoggedIn">
          <span class="text-gray-500 text-sm">{{ authStore.user?.firstName }}</span>
          <button @click="handleLogout" class="text-red-500 hover:text-red-700 text-sm">
            Вийти
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="text-gray-600 hover:text-blue-600">Вхід</RouterLink>
          <RouterLink to="/register"
            class="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm">
            Реєстрація
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
