<template>
  <Drawer v-if="!isAuthPage">
    <RouterView />
  </Drawer>

  <main v-else>
    <nav class="navbar bg-base-100 shadow-sm fixed top-0 z-1 flex justify-center">
      <div class="text-xl font-bold">
        用户工单收集
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

const route = useRoute();
const isAuthPage = computed(() =>
  route.matched.some((record) => record.name === "auth")
);
</script>

<style scoped></style>
