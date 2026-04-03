<template>
  <div style="
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.25s;
    cursor: pointer;
  "
  @mouseover="e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'; }"
  @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }">

    <!-- Cover -->
    <div style="
      height: 160px;
      background: var(--bg-elevated);
      display: flex; align-items: center; justify-content: center;
      position: relative;
      overflow: hidden;
    ">
      <img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title"
        style="width: 100%; height: 100%; object-fit: cover;"/>
      <div v-else style="
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        color: var(--text-muted);
      ">
        <span style="font-size: 2rem;">📚</span>
        <span style="font-size: 0.75rem;">Без обкладинки</span>
      </div>

      <div v-if="!book.isActive" style="
        position: absolute; top: 8px; right: 8px;
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #fca5a5;
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 6px;
      ">Недоступна</div>
    </div>

    <!-- Info -->
    <div style="padding: 16px;">
      <h3 style="
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        color: var(--text-primary);
        margin-bottom: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      ">{{ book.title }}</h3>

      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">
        {{ book.author?.firstName }} {{ book.author?.lastName }}
      </p>

      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="
          background: var(--accent-soft);
          color: var(--accent-hover);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 6px;
        ">{{ book.category?.name }}</span>
        <span v-if="book.publishedYear" style="color: var(--text-muted); font-size: 0.8rem;">
          {{ book.publishedYear }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ book: Object })
</script>