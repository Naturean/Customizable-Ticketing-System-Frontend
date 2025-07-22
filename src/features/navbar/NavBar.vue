<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-1">
    <div class="navbar-start">
      <label
        for="navbar-drawer"
        aria-label="open sidebar"
        class="btn btn-square btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-lg">用户工单收集</a>
    </div>
    <div class="navbar-end">
      <Avatar />
    </div>
  </div>
</template>

<script setup>
import Avatar from "../avatar/Avatar.vue";
</script>

<style scoped></style>
