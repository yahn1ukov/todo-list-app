import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { FILTER_TYPE, PRIORITY_TYPE, SORT_TYPE } from '@/lib/constants'
import { useTodoStore } from '@/stores/todo.ts'

import type { TCreateTodoPayload, TUpdateTodoPayload } from '@/lib/types'

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('States', () => {
    it('should have default filter value', () => {
      const store = useTodoStore()

      expect(store.filter).toBe(FILTER_TYPE.ALL)
    })

    it('should have default sort value', () => {
      const store = useTodoStore()

      expect(store.sort).toBe(SORT_TYPE.CREATED)
    })

    it('should have default search value', () => {
      const store = useTodoStore()

      expect(store.search).toBe('')
    })
  })

  describe('Getters', () => {
    it('should return zero totalCount for empty todo list', () => {
      const store = useTodoStore()

      expect(store.totalCount).toBe(0)
    })

    it('should return empty sortedTodo array for empty todo list', () => {
      const store = useTodoStore()

      expect(store.sortedTodo).toEqual([])
    })

    it('should return empty archivedTodo array for empty todo list', () => {
      const store = useTodoStore()

      expect(store.archivedTodo).toEqual([])
    })

    it('should return correct totalCount after adding todos', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Todo 1',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Todo 2',
        priority: PRIORITY_TYPE.LOW,
      })

      expect(store.totalCount).toBe(2)
    })

    it('should filter todos by completion status', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Completed Todo',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Incomplete Todo',
        priority: PRIORITY_TYPE.LOW,
      })

      store.toggleTodoCompleted(store.sortedTodo[0]!.id)

      store.filter = FILTER_TYPE.COMPLETED

      expect(store.sortedTodo.length).toBe(1)
      expect(store.sortedTodo[0]?.title).toBe('Completed Todo')

      store.filter = FILTER_TYPE.INCOMPLETED

      expect(store.sortedTodo.length).toBe(1)
      expect(store.sortedTodo[0]?.title).toBe('Incomplete Todo')
    })

    it('should sort todos by priority', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Low Priority',
        priority: PRIORITY_TYPE.LOW,
      })
      store.addTodo({
        title: 'High Priority',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Medium Priority',
        priority: PRIORITY_TYPE.MEDIUM,
      })

      store.sort = SORT_TYPE.PRIORITY

      expect(store.sortedTodo[0]?.title).toBe('High Priority')
      expect(store.sortedTodo[1]?.title).toBe('Medium Priority')
      expect(store.sortedTodo[2]?.title).toBe('Low Priority')
    })

    it('should sort todos alphabetically', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Zebra',
        priority: PRIORITY_TYPE.LOW,
      })
      store.addTodo({
        title: 'Apple',
        priority: PRIORITY_TYPE.LOW,
      })
      store.addTodo({
        title: 'Mango',
        priority: PRIORITY_TYPE.LOW,
      })

      store.sort = SORT_TYPE.ALPHABETICAL

      expect(store.sortedTodo[0]?.title).toBe('Apple')
      expect(store.sortedTodo[1]?.title).toBe('Mango')
      expect(store.sortedTodo[2]?.title).toBe('Zebra')
    })

    it('should search todos by title', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Buy groceries',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Walk the dog',
        priority: PRIORITY_TYPE.LOW,
      })
      store.addTodo({
        title: 'Buy tickets',
        priority: PRIORITY_TYPE.MEDIUM,
      })

      store.search = 'buy'

      expect(store.sortedTodo.length).toBe(2)
      expect(store.sortedTodo.every((t) => t.title.toLowerCase().includes('buy'))).toBe(true)
    })

    it('should search todos by description', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Task 1',
        description: 'Important meeting',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Task 2',
        description: 'Coffee break',
        priority: PRIORITY_TYPE.LOW,
      })

      store.search = 'meeting'

      expect(store.sortedTodo.length).toBe(1)
      expect(store.sortedTodo[0]?.title).toBe('Task 1')
    })

    it('should return archived todos', () => {
      const store = useTodoStore()

      store.addTodo({
        title: 'Active Todo',
        priority: PRIORITY_TYPE.HIGH,
      })
      store.addTodo({
        title: 'Archived Todo',
        priority: PRIORITY_TYPE.LOW,
      })

      const todoId = store.sortedTodo[1]!.id

      store.toggleTodoArchived(todoId)

      expect(store.archivedTodo.length).toBe(1)
      expect(store.archivedTodo[0]?.title).toBe('Archived Todo')
    })
  })

  describe('Actions', () => {
    describe('addTodo', () => {
      it('should add a new todo with generated id and default values', () => {
        const store = useTodoStore()
        const payload: TCreateTodoPayload = {
          title: 'Test Todo Title',
          description: 'Test Todo Description',
          priority: PRIORITY_TYPE.HIGH,
        }

        store.addTodo(payload)

        expect(store.totalCount).toBe(1)
        expect(store.sortedTodo[0]).toMatchObject(payload)
        expect(store.sortedTodo[0]!.id).toBeDefined()
      })

      it('should add a todo without description', () => {
        const store = useTodoStore()
        const payload: TCreateTodoPayload = {
          title: 'Test Todo Title',
          priority: PRIORITY_TYPE.MEDIUM,
        }

        store.addTodo(payload)

        expect(store.totalCount).toBe(1)
        expect(store.sortedTodo[0]!.description).toBeUndefined()
      })

      it('should add multiple todos with unique ids', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Todo 1',
          priority: PRIORITY_TYPE.HIGH,
        })
        store.addTodo({
          title: 'Todo 2',
          priority: PRIORITY_TYPE.LOW,
        })
        store.addTodo({
          title: 'Todo 3',
          priority: PRIORITY_TYPE.MEDIUM,
        })

        expect(store.totalCount).toBe(3)

        const ids = store.sortedTodo.map((t) => t.id)
        const uniqueIds = new Set(ids)

        expect(uniqueIds.size).toBe(3)
      })
    })

    describe('toggleTodoCompleted', () => {
      it('should toggle todo completion status', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.toggleTodoCompleted(todoId)

        expect(store.sortedTodo[0]?.isCompleted).toBe(true)

        store.toggleTodoCompleted(todoId)

        expect(store.sortedTodo[0]?.isCompleted).toBe(false)
      })

      it('should update updatedAt when toggling completion', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.toggleTodoCompleted(todoId)

        expect(store.sortedTodo[0]?.updatedAt).toBeInstanceOf(Date)
      })

      it('should not throw error for non-existent id', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        expect(() => store.toggleTodoCompleted('non-existent-id')).not.toThrow()
      })
    })

    describe('toggleTodoArchived', () => {
      it('should toggle todo archived status', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.toggleTodoArchived(todoId)

        expect(store.sortedTodo.length).toBe(0)
        expect(store.archivedTodo[0]?.isArchived).toBe(true)

        store.toggleTodoArchived(todoId)

        expect(store.sortedTodo[0]?.isArchived).toBe(false)
        expect(store.archivedTodo.length).toBe(0)
      })

      it('should update updatedAt when toggling archived status', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.toggleTodoArchived(todoId)

        expect(store.archivedTodo[0]?.updatedAt).toBeInstanceOf(Date)
      })

      it('should not throw error for non-existent id', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        expect(() => store.toggleTodoArchived('non-existent-id')).not.toThrow()
      })
    })

    describe('updateTodo', () => {
      it('should update todo with new values', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Original Title',
          priority: PRIORITY_TYPE.LOW,
        })

        const todoId = store.sortedTodo[0]!.id
        const payload: TUpdateTodoPayload = {
          title: 'Updated Title',
          description: 'Updated Description',
          priority: PRIORITY_TYPE.HIGH,
        }

        store.updateTodo(todoId, payload)

        expect(store.sortedTodo[0]).toMatchObject(payload)
      })

      it('should update only provided fields', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Original Title',
          description: 'Original Description',
          priority: PRIORITY_TYPE.LOW,
        })

        const todoId = store.sortedTodo[0]!.id

        store.updateTodo(todoId, { title: 'New Title' })

        expect(store.sortedTodo[0]?.title).toBe('New Title')
        expect(store.sortedTodo[0]?.description).toBe('Original Description')
        expect(store.sortedTodo[0]?.priority).toBe(PRIORITY_TYPE.LOW)
      })

      it('should update updatedAt timestamp', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.updateTodo(todoId, { title: 'Updated Title' })

        expect(store.sortedTodo[0]?.updatedAt).toBeInstanceOf(Date)
      })

      it('should not throw error for non-existent id', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        expect(() => store.updateTodo('non-existent-id', { title: 'New Title' })).not.toThrow()
      })
    })

    describe('removeTodo', () => {
      it('should remove todo from the list', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Todo 1',
          priority: PRIORITY_TYPE.HIGH,
        })
        store.addTodo({
          title: 'Todo 2',
          priority: PRIORITY_TYPE.LOW,
        })

        const todoId = store.sortedTodo[0]!.id

        store.removeTodo(todoId)

        expect(store.totalCount).toBe(1)
        expect(store.sortedTodo.find((t) => t.id === todoId)).toBeUndefined()
      })

      it('should remove todo from archived list as well', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Archived Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        const todoId = store.sortedTodo[0]!.id

        store.toggleTodoArchived(todoId)

        expect(store.archivedTodo.length).toBe(1)

        store.removeTodo(todoId)

        expect(store.totalCount).toBe(0)
        expect(store.archivedTodo.length).toBe(0)
      })

      it('should not throw error for non-existent id', () => {
        const store = useTodoStore()

        store.addTodo({
          title: 'Test Todo',
          priority: PRIORITY_TYPE.HIGH,
        })

        expect(() => store.removeTodo('non-existent-id')).not.toThrow()
        expect(store.totalCount).toBe(1)
      })
    })
  })
})
