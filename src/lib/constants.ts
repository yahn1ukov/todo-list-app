export const PINIA_STORE_KEY = {
  TODO: 'todo',
} as const

export const LOCAL_STORAGE_KEY = {
  TODO: 'todo',
  FILTER: 'filter',
  SORT: 'sort',
} as const

export const ROUTE_NAME = {
  HOME: 'home',
  ARCHIVE: 'archive',
  NOT_FOUND: 'notFound',
} as const

export const PRIORITY_TYPE = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export const PRIORITY_ORDER = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const

export const FILTER_TYPE = {
  ALL: 'All',
  COMPLETED: 'Completed',
  INCOMPLETED: 'Incompleted',
} as const

export const SORT_TYPE = {
  CREATED: 'Created',
  PRIORITY: 'Priority',
  ALPHABETICAL: 'Alphabetical',
} as const
