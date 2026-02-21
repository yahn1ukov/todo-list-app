<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { FILTER_TYPE, SORT_TYPE } from '@/lib/constants.ts'
import { useTodoStore } from '@/stores/todo'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { TFilterType, TSortType } from '@/lib/types'

interface IEmits {
  (event: 'modal:open'): void
}

defineEmits<IEmits>()

const store = useTodoStore()
const { filter, sort } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-wrap justify-between">
    <Tabs :model-value="filter" @update:model-value="filter = $event as TFilterType">
      <TabsList>
        <TabsTrigger v-for="type of FILTER_TYPE" :key="type" :value="type">
          {{ type }}
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <div class="flex gap-4">
      <Select :model-value="sort" @update:model-value="sort = $event as TSortType">
        <SelectTrigger class="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="type of SORT_TYPE" :key="type" :value="type">
            {{ type }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button @click="$emit('modal:open')">
        <Pencil />
        Add
      </Button>
    </div>
  </div>
</template>
