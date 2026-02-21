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

export const FILTER_TYPE = {
  ALL: 'All',
  COMPLETED: 'Completed',
  INCOMPLETED: 'Incompleted',
} as const

export const SORT_TYPE = {
  CREATED: 'Created',
  ALPHABETICAL: 'Alphabetical',
} as const
