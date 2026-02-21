<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { ROUTE_NAME } from '@/lib/constants.ts'
import { routes } from '@/router/index.ts'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const route = useRoute()
const currentRoute = computed(() => route.name || ROUTE_NAME.HOME)

const navRoutes = computed(() => routes.filter((r) => r.meta?.nav))
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="gap-4">
      <NavigationMenuItem v-for="route in navRoutes" :key="route.path">
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()" :active="currentRoute === route.name">
          <RouterLink :to="route.path" class="flex-row items-center gap-2">
            <component :is="route.meta!.nav!.icon" />
            {{ route.meta!.nav!.label }}
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
