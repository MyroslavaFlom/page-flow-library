<template>
  <div class="flex items-center gap-2 justify-center mt-6">
    <button @click="$emit('change', page - 1)" :disabled="page <= 1"
      class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">
      ←
    </button>

    <span class="text-sm text-gray-600">
      {{ page }} / {{ totalPages }}
    </span>

    <button @click="$emit('change', page + 1)" :disabled="page >= totalPages"
      class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100">
      →
    </button>
  </div>
</template>

<script setup>
defineProps({ page: Number, totalPages: Number })
defineEmits(['change'])
</script>