<script setup lang="ts">
import { CircleAlert } from 'lucide-vue-next';

import Placeholder from '@/components/Placeholder.vue';
</script>

<template>
  <Placeholder title="Page Not Found" description="The page you are looking for doesn't exist or has been moved." button
    button-label="Go Back" @button:click="$router.back">
    <template #icon>
      <CircleAlert />
    </template>
  </Placeholder>
</template>
