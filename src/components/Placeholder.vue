<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

interface IProps {
  title: string
  description: string
  button?: boolean
  buttonLabel?: string
}

interface IEmits {
  (event: 'button:click'): void
}

defineProps<IProps>()
defineEmits<IEmits>()
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <slot name="icon" />
      </EmptyMedia>
      <EmptyTitle>{{ title }}</EmptyTitle>
      <EmptyDescription>{{ description }}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent v-if="button">
      <Button @click="$emit('button:click')">
        <slot v-if="$slots.buttonIcon" name="buttonIcon" />
        {{ buttonLabel }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
