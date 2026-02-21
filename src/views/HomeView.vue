<script setup lang="ts">
import { FileIcon, Pencil } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useTodoStore } from '@/stores/todo.ts'

import Modal from '@/components/Modal.vue'
import Placeholder from '@/components/Placeholder.vue'
import TodoList from '@/components/TodoList.vue'
import TodoListItem from '@/components/TodoListItem.vue'
import Toolbar from '@/components/Toolbar.vue'

import type { ITodo } from '@/lib/types'

const store = useTodoStore()
const { totalCount, sortedTodo } = storeToRefs(store)

const isModalOpen = ref(false)
const selectedTodo = ref<ITodo | undefined>(undefined)

function onModalOpen(todo?: ITodo) {
  selectedTodo.value = todo
  isModalOpen.value = true
}
</script>

<template>
  <Placeholder v-if="!totalCount" title="Not Todo Yet"
    description="Your list is looking a bit lonely. Add your first task to get the ball rolling." button
    button-label="Add New Todo" @button:click="onModalOpen">
    <template #icon>
      <FileIcon />
    </template>
    <template #buttonIcon>
      <Pencil />
    </template>
  </Placeholder>

  <div v-else>
    <Toolbar @modal:open="onModalOpen" />

    <TodoList v-if="sortedTodo.length" class="mt-4" :todo="sortedTodo">
      <template #default="{ todo }">
        <TodoListItem :todo @modal:open="onModalOpen" />
      </template>
    </TodoList>

    <p v-else class="mt-4 text-center font-medium">No todo found for this filter.</p>
  </div>

  <Modal :todo="selectedTodo" v-model="isModalOpen" />
</template>
