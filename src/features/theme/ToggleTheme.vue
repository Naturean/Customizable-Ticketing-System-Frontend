<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" v-model="isDarkTheme" @change="onChangeTheme" />

    <!-- sun icon -->
    <SunIcon class="swap-off h-10 w-10 fill-current" />

    <!-- moon icon -->
    <MoonIcon class="swap-on h-10 w-10 fill-current" />
  </label>
</template>

<script setup>
import SunIcon from "@/icons/SunIcon.vue";
import MoonIcon from "@/icons/MoonIcon.vue";

import { ref, onMounted } from "vue";
const isDarkTheme = ref(
  JSON.parse(localStorage.getItem("is-dark-theme")) || false
);

function onChangeTheme() {
  if (isDarkTheme.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  localStorage.setItem("is-dark-theme", JSON.stringify(isDarkTheme.value));
}

onMounted(() => {
  if (!document.documentElement.hasAttribute("data-theme")) {
    const theme = JSON.parse(localStorage.getItem("is-dark-theme"))
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }
});
</script>

<style scoped></style>
