import { PRIORITY_TYPE, type FILTER_TYPE, type SORT_TYPE } from './constants'

export interface ITodo {
  id: string
  title: string
  description?: string
  priority: TPriorityType
  isCompleted: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt?: Date
}

export type TCreateTodoPayload = Omit<ITodo, 'id' | 'isCompleted' | 'isArchived' | 'createdAt' | 'updatedAt'>

export type TUpdateTodoPayload = Partial<Omit<ITodo, 'id' | 'isCompleted' | 'isArchived' | 'createdAt' | 'updatedAt'>>

export type TPriorityType = (typeof PRIORITY_TYPE)[keyof typeof PRIORITY_TYPE]

export type TFilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE]

export type TSortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE]
