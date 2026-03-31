<template>
  <div class="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-5 flex flex-col gap-3">
    <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center overflow-hidden">
      <img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" class="h-full object-cover" />
      <span v-else class="text-gray-400 text-sm">Без обкладинки</span>
    </div>

    <span v-if="!book.isActive"
      class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full w-fit">
      Недоступна
    </span>

    <h3 class="font-semibold text-gray-800 line-clamp-2">{{ book.title }}</h3>

    <p class="text-sm text-gray-500">
      {{ book.author?.firstName }} {{ book.author?.lastName }}
    </p>

    <div class="flex items-center justify-between text-xs text-gray-400 mt-auto">
      <span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
        {{ book.category?.name }}
      </span>
      <span v-if="book.publishedYear">{{ book.publishedYear }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ book: Object })
</script>