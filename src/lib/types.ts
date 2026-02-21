import type { FILTER_TYPE, SORT_TYPE } from './constants'

export interface ITodo {
  id: string
  title: string
  description?: string
  isCompleted: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt?: Date
}

export type TCreateTodoPayload = Omit<ITodo, 'id' | 'isCompleted' | 'isArchived' | 'createdAt' | 'updatedAt'>

export type TUpdateTodoPayload = Partial<Omit<ITodo, 'id' | 'isArchived' | 'createdAt' | 'updatedAt'>>

export type TFilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE]

export type TSortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE]
