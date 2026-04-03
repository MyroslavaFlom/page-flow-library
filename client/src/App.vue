<template>
  <div class="min-h-screen" style="background: var(--bg-base);">
    <NavBar />
    <main class="container mx-auto px-4 py-10" style="max-width: 1280px;">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>