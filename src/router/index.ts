import { Archive, House } from 'lucide-vue-next'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { ROUTE_NAME } from '@/lib/constants.ts'

const HomeView = () => import('../views/HomeView.vue')
const ArchiveView = () => import('../views/ArchiveView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: HomeView,
    meta: {
      nav: {
        icon: House,
        label: 'Home',
      },
    },
  },
  {
    path: '/archive',
    name: ROUTE_NAME.ARCHIVE,
    component: ArchiveView,
    meta: {
      nav: {
        icon: Archive,
        label: 'Archive',
      },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAME.NOT_FOUND,
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { routes }
export default router
