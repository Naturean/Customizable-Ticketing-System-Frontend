<template>
  <!-- Drawer -->
  <div class="drawer lg:drawer-open">
    <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />

    <!-- dvh for 100% true viewport height -->
    <div class="drawer-content flex flex-col min-h-dvh">
      <NavBar />

      <slot></slot>
    </div>

    <div class="drawer-side">
      <label
        for="navbar-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <DrawerList />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/features/navbar/NavBar.vue";
import DrawerList from "./DrawerList.vue";
</script>

<style scoped></style>
