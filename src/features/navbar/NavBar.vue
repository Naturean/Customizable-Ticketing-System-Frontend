<template>
  <nav class="navbar bg-base-100 shadow-sm sticky top-0 z-1">
    <div class="navbar-start">
      <label
        for="navbar-drawer"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost lg:hidden"
      >
        <MenuIcon />
      </label>
      <ToggleTheme class="hidden lg:inline-grid" />
    </div>
    <div class="navbar-center">
      <RouterLink :to="{ name: 'ticket-submit' }" class="btn btn-ghost text-lg"
        >用户工单收集</RouterLink
      >
    </div>
    <div class="navbar-end">
      <Avatar />
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Avatar from "../user/Avatar.vue";
import MenuIcon from "@/icons/MenuIcon.vue";
import ToggleTheme from "../theme/ToggleTheme.vue";
</script>

<style scoped></style>
