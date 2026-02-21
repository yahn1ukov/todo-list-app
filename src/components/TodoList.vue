<script setup lang="ts">
import { ItemGroup } from '@/components/ui/item';

import type { ITodo } from '@/lib/types';

interface IProps {
  todo: ITodo[]
}

defineProps<IProps>()
</script>

<template>
  <ItemGroup class="gap-2">
    <slot v-for="t of todo" :key="t.id" :todo="t" />
  </ItemGroup>
</template>
