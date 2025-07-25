<template>
  <main
    class="flex flex-col flex-1 items-center justify-center"
    v-if="!isLoggedIn"
  >
    <h1 class="text-2xl font-bold my-2">您尚未登录</h1>
    <RouterLink :to="{ name: 'login' }" class="btn my-2">前往登录</RouterLink>
  </main>

  <main class="flex flex-1 items-center justify-center p-4" v-else>
    <div class="w-xs sm:w-sm md:w-md lg:w-lg transition-all duration-300">
      <UserForm />
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

import UserForm from "@/features/user/UserForm.vue";
</script>

<style scoped></style>
