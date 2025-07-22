<template>
  <!-- Drawer -->
  <div class="drawer lg:drawer-open">
    <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />

    <!-- dvh for 100% true viewport height -->
    <div class="drawer-content flex flex-col h-dvh">
      <NavBar />

      <div class="flex flex-1 items-center justify-center">
        <div class="w-xs sm:w-sm md:w-md lg:w-lg transition-all duration-300">
          <TicketForm />
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label
        for="navbar-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 min-h-full w-40 lg:w-60 p-4 sticky">
        <!-- Sidebar content here -->
        <li class="menu-title">工单</li>
        <li class="m-1 cursor-pointer"><a class="menu-active">提交工单</a></li>
        <li class="m-1 cursor-pointer"><a>查询工单</a></li>
        <li class="m-1 cursor-pointer"><a>历史工单</a></li>
        <li class="menu-title">账号</li>
        <li class="m-1 cursor-pointer"><a>个人账号</a></li>
        <li class="m-1 cursor-pointer"><a>账号管理</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./features/navbar/NavBar.vue";
import TicketForm from "./features/ticket/TicketForm.vue";
</script>

<style scoped></style>
