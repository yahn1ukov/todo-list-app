<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="py-4 flex justify-center bg-white border-b-4 border-b-gray-200">
      <Navbar />
    </header>

    <main class="p-4 flex-1 container mx-auto flex flex-col">
      <RouterView />
    </main>
  </div>
</template>
