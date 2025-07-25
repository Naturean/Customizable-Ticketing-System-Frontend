<template>
  <ul class="menu bg-base-200 min-h-full w-40 lg:w-60 p-4 sticky">
    <template v-for="group in menuItems" :key="group.title">
      <!-- Title -->
      <li class="menu-title">{{ group.title }}</li>
      <!-- Clickable Tab -->
      <li v-for="item in group.children" :key="item.name" class="m-1">
        <RouterLink
          :to="{ name: item.name }"
          active-class="menu-active"
          exact-active-class="menu-active"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </template>
    <li class="flex-1 opacity-0"></li>
    <li class="lg:hidden"><ToggleTheme /></li>
  </ul>
</template>

<script setup>
import ToggleTheme from "../theme/ToggleTheme.vue";
import { useDrawerList } from "./useDrawerList.js";

const { menuItems } = useDrawerList();
</script>

<style scoped></style>
