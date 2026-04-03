<template>
  <nav style="
    background: rgba(22, 22, 42, 0.85);
    border-bottom: 1px solid var(--border-subtle);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 50;
  ">
    <div style="max-width: 1280px;" class="mx-auto px-6 py-4 flex items-center justify-between">

      <RouterLink to="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
        <div style="
          width: 32px; height: 32px;
          background: var(--accent);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        ">📖</div>
        <span style="
          font-family: 'Nunito', sans-serif;
          font-size: 1.3rem;
          color: var(--text-primary);
          font-weight: 700;
        ">Page Flow</span>
      </RouterLink>

      <div style="display: flex; align-items: center; gap: 32px;">
        <RouterLink to="/books" style="color: var(--text-secondary); font-size: 0.95rem; transition: color 0.2s;"
          @mouseover="e => e.target.style.color = 'var(--text-primary)'"
          @mouseleave="e => e.target.style.color = 'var(--text-secondary)'">
          Каталог
        </RouterLink>

        <RouterLink v-if="authStore.isAdmin" to="/admin/books"
          style="color: var(--text-secondary); font-size: 0.95rem; transition: color 0.2s;"
          @mouseover="e => e.target.style.color = 'var(--text-primary)'"
          @mouseleave="e => e.target.style.color = 'var(--text-secondary)'">
          Адмін
        </RouterLink>

        <template v-if="authStore.isLoggedIn">
          <span style="color: var(--text-muted); font-size: 0.9rem;">
            {{ authStore.user?.firstName }}
          </span>
          <button @click="handleLogout" style="
            color: #f87171;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            font-family: 'Nunito', sans-serif;
            transition: color 0.2s;
          ">Вийти</button>
        </template>
        <template v-else>
          <RouterLink to="/login" style="color: var(--text-secondary); font-size: 0.95rem;">
            Вхід
          </RouterLink>
          <RouterLink to="/register" style="
            background: var(--accent);
            color: white;
            padding: 8px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            transition: background 0.2s;
          "
          @mouseover="e => e.target.style.background = 'var(--accent-hover)'"
          @mouseleave="e => e.target.style.background = 'var(--accent)'">
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