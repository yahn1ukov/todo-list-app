<script setup lang="ts">
import { ArchiveIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useTodoStore } from '@/stores/todo.ts'

import Placeholder from '@/components/Placeholder.vue'
import TodoList from '@/components/TodoList.vue'
import TodoListItem from '@/components/TodoListItem.vue'

const store = useTodoStore()

const { archivedTodo } = storeToRefs(store)
</script>

<template>
  <Placeholder v-if="!archivedTodo.length" title="Nothing Here Yet"
    description="Archive completed tasks to clear your mind and keep this space updated.">
    <template #icon>
      <ArchiveIcon />
    </template>
  </Placeholder>

  <TodoList v-else :todo="archivedTodo">
    <template #default="{ todo }">
      <TodoListItem :todo is-archive />
    </template>
  </TodoList>
</template>
