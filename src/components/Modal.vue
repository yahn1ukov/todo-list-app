<script setup lang="ts">
import { ref, watch } from 'vue'

import { PRIORITY_TYPE } from '@/lib/constants'
import { useTodoStore } from '@/stores/todo'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import type { ITodo, TCreateTodoPayload, TPriorityType } from '@/lib/types'

interface IProps {
  todo?: ITodo
}

const props = defineProps<IProps>()
const isOpen = defineModel<boolean>()
const store = useTodoStore()

const form = ref<TCreateTodoPayload>({
  title: '',
  description: '',
  priority: PRIORITY_TYPE.LOW,
})

watch(
  isOpen,
  (isModalOpened) => {
    if (isModalOpened) {
      form.value = {
        title: props.todo?.title ?? '',
        description: props.todo?.description ?? '',
        priority: props.todo?.priority ?? PRIORITY_TYPE.LOW,
      }
    }
  }
)

function submit() {
  if (props.todo) {
    store.updateTodo(props.todo.id, { ...form.value })
  } else {
    store.addTodo({ ...form.value })
  }

  isOpen.value = false
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-106.25">
      <form class="grid gap-4" @submit.prevent="submit">
        <DialogHeader>
          <DialogTitle>{{ todo ? 'Edit Todo' : 'Add Todo' }}</DialogTitle>
        </DialogHeader>

        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" required />
          </div>

          <div class="grid gap-3">
            <Label for="priority">Priority</Label>
            <Select id="priority" :model-value="form.priority"
              @update:model-value="form.priority = $event as TPriorityType">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="type of PRIORITY_TYPE" :key="type" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="grid gap-3">
            <Label for="description">Description</Label>
            <Textarea id="description" v-model="form.description" />
          </div>
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
