<script setup lang="ts">
import { Pencil, Search, XCircleIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { FILTER_TYPE, SORT_TYPE } from '@/lib/constants.ts'
import { useTodoStore } from '@/stores/todo'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface IEmits {
  (event: 'modal:open'): void
}

defineEmits<IEmits>()

const store = useTodoStore()
const { filter, sort, search } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2">
    <Tabs v-model="filter">
      <TabsList class="flex w-full md:inline-flex md:w-auto">
        <TabsTrigger v-for="type of FILTER_TYPE" :key="type" :value="type">
          {{ type }}
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <InputGroup class="w-full md:w-65">
      <InputGroupInput v-model="search" placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon v-if="search" align="inline-end">
        <InputGroupButton class="rounded-full" size="icon-xs" @click="search = ''">
          <XCircleIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>

    <div class="flex w-full md:w-auto gap-4">
      <Select v-model="sort">
        <SelectTrigger class="flex-2 md:w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="type of SORT_TYPE" :key="type" :value="type">
            {{ type }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button class="flex-1 md:flex-none" @click="$emit('modal:open')">
        <Pencil />
        Add
      </Button>
    </div>
  </div>
</template>
