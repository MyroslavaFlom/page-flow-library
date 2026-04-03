<template>
  <div>
    <!-- Hero -->
    <section style="
      padding: 80px 0 60px;
      text-align: center;
      position: relative;
    ">
      <div style="
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%);
        pointer-events: none;
      "></div>

      <div style="position: relative;">
        <div style="
          display: inline-block;
          background: var(--accent-soft);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 0.8rem;
          color: var(--accent-hover);
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        ">БІБЛІОТЕЧНИЙ РЕСУРСНИЙ ЦЕНТР</div>

        <h1 style="
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1.15;
        ">
          Відкрийте світ<br>
          <span style="color: var(--accent-hover);">через книги</span>
        </h1>

        <p style="
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 40px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        ">
          Знаходьте, читайте та відкривайте нові книги у нашому каталозі
        </p>

        <RouterLink to="/books" style="
          display: inline-block;
          background: var(--accent);
          color: white;
          padding: 14px 36px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
          box-shadow: 0 0 32px rgba(99,102,241,0.3);
        ">
          Переглянути каталог →
        </RouterLink>
      </div>
    </section>

    <!-- Stats -->
    <section style="
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 64px;
    ">
      <div v-for="stat in stats" :key="stat.label" style="
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
      ">
        <div style="font-size: 2rem; font-weight: 700; color: var(--accent-hover);">
          {{ stat.value }}
        </div>
        <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">
          {{ stat.label }}
        </div>
      </div>
    </section>

    <!-- Recent books -->
    <section>
      <h2 style="font-size: 1.8rem; margin-bottom: 24px; color: var(--text-primary);">
        Нові надходження
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
        <BookCard v-for="book in recentBooks" :key="book._id" :book="book" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookCard from '@/components/BookCard.vue'
import { getBooks } from '@/api/books.api'

const recentBooks = ref([])
const stats = ref([
  { value: '...', label: 'Книг у каталозі' },
  { value: '...', label: 'Авторів' },
  { value: '...', label: 'Категорій' },
])

onMounted(async () => {
  const data = await getBooks({ limit: 4, page: 1 })
  recentBooks.value = data.books
  stats.value[0].value = data.total
})
</script>