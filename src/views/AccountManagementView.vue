<template>
  <main class="p-4">
    <div
      class="collapse collapse-arrow bg-base-200 border-base-300 border rounded-2xl w-auto my-2 p-4"
    >
      <input type="checkbox" />
      <div class="collapse-title font-semibold">创建新员工</div>
      <div class="collapse-content text-sm">
        <CreateStaffForm />
      </div>
    </div>
    <AccountTable />
  </main>
</template>

<script setup>
import AccountTable from "@/features/account/AccountTable.vue";
import CreateStaffForm from "@/features/account/CreateStaffForm.vue";
</script>

<style scoped></style>
