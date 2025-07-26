<template>
  <Drawer v-if="!isAuthPage">
    <RouterView />
  </Drawer>

  <main v-else>
    <nav
      class="navbar bg-base-100 shadow-sm fixed top-0 z-1 grid grid-cols-[50px_1fr_50px]"
    >
      <div class="text-center font-bold col-2">
        <RouterLink
          :to="{ name: 'ticket-submit' }"
          class="btn btn-ghost text-lg lg:text-xl transition-all duration-200"
          >用户工单收集</RouterLink
        >
      </div>
      <div class="col-3 text-right">
        <ToggleTheme />
      </div>
    </nav>
    <div class="flex flex-col justify-center items-center min-h-dvh">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { useRoute, RouterView } from "vue-router";
import { computed } from "vue";
import Drawer from "@/features/drawer/Drawer.vue";
import ToggleTheme from "@/features/theme/ToggleTheme.vue";

const route = useRoute();
const isAuthPage = computed(() =>
  route.matched.some((record) => record.name === "auth")
);
</script>

<style scoped></style>
