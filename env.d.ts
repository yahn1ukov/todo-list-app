/// <reference types="vite/client" />

import { type LucideIcon } from 'lucide-vue-next'
import 'vue-router'

interface NavRouteMeta {
  icon: LucideIcon
  label: string
}

declare module 'vue-router' {
  interface RouteMeta {
    nav?: NavRouteMeta
  }
}

export {}
