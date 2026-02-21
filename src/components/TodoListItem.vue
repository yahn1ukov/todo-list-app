<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import { Archive, ArchiveXIcon, Check, Ellipsis, Pencil, Trash, X } from 'lucide-vue-next'

import { useTodoStore } from '@/stores/todo'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from '@/components/ui/item'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import type { ITodo } from '@/lib/types'

interface IProps {
  todo: ITodo
  isArchive?: boolean
}

interface IEmits {
  (event: 'modal:open', todo: ITodo): void
}

defineProps<IProps>()
defineEmits<IEmits>()

const store = useTodoStore()
</script>

<template>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>{{ todo.title }}</ItemTitle>
      <ItemDescription>{{ todo.description }}</ItemDescription>
    </ItemContent>

    <ItemActions>
      <TooltipProvider>
        <ButtonGroup>
          <template v-if="!isArchive">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline" size="icon" @click="store.toggleTodoCompleted(todo.id)">
                  <Check v-if="!todo.isCompleted" />
                  <X v-else />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{{ !todo.isCompleted ? 'Complete' : 'Incomplete' }}</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="icon">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent class="w-12">
                <DropdownMenuItem @select="$emit('modal:open', todo)">
                  <Pencil />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem @select="store.toggleTodoArchived(todo.id)">
                  <Archive />
                  Archive
                </DropdownMenuItem>

                <DropdownMenuItem variant="destructive" @select="store.removeTodo(todo.id)">
                  <Trash />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>

          <template v-else>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline" size="icon" @click="store.toggleTodoArchived(todo.id)">
                  <ArchiveXIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Unarchive</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="destructive" size="icon" @click="store.removeTodo(todo.id)">
                  <Trash />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Remove</p>
              </TooltipContent>
            </Tooltip>
          </template>
        </ButtonGroup>
      </TooltipProvider>
    </ItemActions>

    <ItemFooter class="justify-end gap-2 text-muted-foreground">
      <p v-if="!todo.updatedAt">created {{ formatTimeAgo(todo.createdAt) }}</p>
      <p v-else>updated {{ formatTimeAgo(todo.updatedAt) }}</p>
    </ItemFooter>
  </Item>
</template>
