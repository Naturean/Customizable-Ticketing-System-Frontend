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
  </ul>
</template>

<script setup>
import { useDrawerList } from "./useDrawerList.js";

const { menuItems } = useDrawerList();
</script>

<style scoped></style>
