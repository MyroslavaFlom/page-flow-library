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
          Реєстрація в Page Flow
        </h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">
          Створіть акаунт щоб отримати доступ
        </p>
      </div>

      <!-- Success -->
      <div v-if="success" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 16px;">✓</div>
        <p style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">
          Реєстрація успішна!
        </p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          Перевірте email <span style="color: var(--accent-hover); font-weight: 500;">{{ form.email }}</span>
          та натисніть посилання для підтвердження.
        </p>
      </div>

      <!-- Form -->
      <div v-else style="display: flex; flex-direction: column; gap: 16px;">
        <div v-for="field in fields" :key="field.key">
          <label style="display: block; color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 6px;">
            {{ field.label }}
          </label>
          <input
            v-model="form[field.key]"
            :type="field.type || 'text'"
            :placeholder="field.placeholder"
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
          />
        </div>

        <div v-if="error" style="
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
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
          margin-top: 4px;
        "
        @mouseover="e => !loading && (e.target.style.background = 'var(--accent-hover)')"
        @mouseleave="e => e.target.style.background = 'var(--accent)'">
          {{ loading ? 'Реєстрація...' : 'Зареєструватись' }}
        </button>
      </div>

      <p style="text-align: center; margin-top: 20px; color: var(--text-muted); font-size: 0.9rem;">
        Вже є акаунт?
        <RouterLink to="/login" style="color: var(--accent-hover); margin-left: 4px;">Увійти</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { register } from '@/api/auth.api'

const form = ref({ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '' })
const error = ref('')
const loading = ref(false)
const success = ref(false)

const fields = [
  { key: 'firstName', label: "Ім'я", placeholder: "Ваше ім'я" },
  { key: 'lastName', label: 'Прізвище', placeholder: 'Ваше прізвище' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
  { key: 'password', label: 'Пароль', type: 'password', placeholder: '•••••••• (мінімум 6 символів)' },
  { key: 'passwordConfirm', label: 'Повторіть пароль', type: 'password', placeholder: '••••••••' },
]

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