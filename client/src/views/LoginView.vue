<template>
  <div style="
    min-height: 80vh;
    display: flex; align-items: center; justify-content: center;
  ">
    <div style="
      width: 100%; max-width: 420px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      padding: 40px;
      box-shadow: var(--shadow);
    ">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="
          width: 48px; height: 48px;
          background: var(--accent-soft);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          font-size: 22px;
        ">📖</div>
        <h1 style="font-size: 1.8rem; color: var(--text-primary); margin-bottom: 6px;">
          Вхід до Page Flow
        </h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">
          Введіть свої дані для входу
        </p>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 6px;">
          Email
        </label>
        <input v-model="form.email" type="email" placeholder="your@email.com"
          style="
            width: 100%;
            background: var(--bg-elevated);
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            padding: 12px 16px;
            color: var(--text-primary);
            font-size: 0.95rem;
            font-family: 'Nunito', sans-serif;
            outline: none;
            transition: border-color 0.2s;
          "
          @focus="e => e.target.style.borderColor = 'var(--accent)'"
          @blur="e => e.target.style.borderColor = 'var(--border-subtle)'"/>
      </div>

      <div style="margin-bottom: 24px;">
        <label style="display: block; color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 6px;">
          Пароль
        </label>
        <input v-model="form.password" type="password" placeholder="••••••••"
          style="
            width: 100%;
            background: var(--bg-elevated);
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            padding: 12px 16px;
            color: var(--text-primary);
            font-size: 0.95rem;
            font-family: 'Nunito', sans-serif;
            outline: none;
            transition: border-color 0.2s;
          "
          @focus="e => e.target.style.borderColor = 'var(--accent)'"
          @blur="e => e.target.style.borderColor = 'var(--border-subtle)'"
          @keyup.enter="handleSubmit"/>
      </div>

      <div v-if="error" style="
        background: rgba(239,68,68,0.1);
        border: 1px solid rgba(239,68,68,0.3);
        color: #fca5a5;
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 0.85rem;
        margin-bottom: 16px;
      ">{{ error }}</div>

      <button @click="handleSubmit" :disabled="loading" style="
        width: 100%;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 13px;
        font-size: 1rem;
        font-family: 'Nunito', sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      "
      @mouseover="e => !loading && (e.target.style.background = 'var(--accent-hover)')"
      @mouseleave="e => e.target.style.background = 'var(--accent)'">
        {{ loading ? 'Вхід...' : 'Увійти' }}
      </button>

      <p style="text-align: center; margin-top: 20px; color: var(--text-muted); font-size: 0.9rem;">
        Немає акаунту?
        <RouterLink to="/register" style="color: var(--accent-hover); margin-left: 4px;">
          Зареєструватись
        </RouterLink>
      </p>
    </div>
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
    router.push(data.user.role === 'admin' ? '/admin/books' : '/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Помилка входу'
  } finally {
    loading.value = false
  }
}
</script>