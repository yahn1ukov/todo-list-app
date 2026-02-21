<script setup lang="ts">
import { cn } from '@/lib/utils';
import { buttonGroupVariants } from '.';

import type { HTMLAttributes } from 'vue';
import type { ButtonGroupVariants } from '.';

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>()
</script>

<template>
  <div role="group" data-slot="button-group" :data-orientation="props.orientation"
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), props.class)">
    <slot />
  </div>
</template>
