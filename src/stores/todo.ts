import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { FILTER_TYPE, LOCAL_STORAGE_KEY, PINIA_STORE_KEY, PRIORITY_ORDER, SORT_TYPE } from '@/lib/constants.ts'

import type { ITodo, TCreateTodoPayload, TFilterType, TSortType, TUpdateTodoPayload } from '@/lib/types'

export const useTodoStore = defineStore(PINIA_STORE_KEY.TODO, () => {
  const filter = useLocalStorage<TFilterType>(LOCAL_STORAGE_KEY.FILTER, FILTER_TYPE.ALL)
  const sort = useLocalStorage<TSortType>(LOCAL_STORAGE_KEY.SORT, SORT_TYPE.CREATED)
  const search = ref<string>('')

  const todo = useLocalStorage<ITodo[]>(LOCAL_STORAGE_KEY.TODO, [], {
    serializer: {
      read: (v: string) =>
        JSON.parse(v).map((t: ITodo) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
        })),
      write: (v: ITodo[]) => JSON.stringify(v),
    },
  })

  const totalCount = computed(() => todo.value.length)

  const archivedTodo = computed(() => todo.value.filter((t) => t.isArchived))

  const sortedTodo = computed(() => {
    const unarchivedTodo = todo.value.filter((t) => !t.isArchived)

    const filteredTodo =
      filter.value === FILTER_TYPE.ALL
        ? unarchivedTodo
        : unarchivedTodo.filter((t) => (filter.value === FILTER_TYPE.COMPLETED ? t.isCompleted : !t.isCompleted))

    const searchedTodo = filteredTodo.filter((t) => {
      const query = search.value.toLowerCase().trim()
      if (!query) {
        return true
      }

      return t.title.toLowerCase().includes(query) || t.description?.toLowerCase().includes(query)
    })

    return [...searchedTodo].sort((a: ITodo, b: ITodo) => {
      switch (sort.value) {
        case SORT_TYPE.PRIORITY:
          return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
        case SORT_TYPE.ALPHABETICAL:
          return a.title.localeCompare(b.title)
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })
  })

  function _findTodo(id: string) {
    return todo.value.find((t) => t.id === id)
  }

  function addTodo(payload: TCreateTodoPayload) {
    todo.value.push({
      ...payload,
      id: crypto.randomUUID(),
      isCompleted: false,
      isArchived: false,
      createdAt: new Date(),
    })
  }

  function toggleTodoCompleted(id: string) {
    const t = _findTodo(id)
    if (t) {
      t.isCompleted = !t.isCompleted
      t.updatedAt = new Date()
    }
  }

  function toggleTodoArchived(id: string) {
    const t = _findTodo(id)
    if (t) {
      t.isArchived = !t.isArchived
      t.updatedAt = new Date()
    }
  }

  function updateTodo(id: string, payload: TUpdateTodoPayload) {
    const t = _findTodo(id)
    if (t) {
      Object.assign(t, {
        ...payload,
        updatedAt: new Date(),
      })
    }
  }

  function removeTodo(id: string) {
    todo.value = todo.value.filter((t) => t.id !== id)
  }

  return {
    filter,
    sort,
    search,
    totalCount,
    sortedTodo,
    archivedTodo,
    addTodo,
    toggleTodoCompleted,
    toggleTodoArchived,
    updateTodo,
    removeTodo,
  }
})
