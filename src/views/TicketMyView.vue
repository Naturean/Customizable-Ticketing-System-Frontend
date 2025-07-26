<template>
  <main class="p-4">
    <TicketSearchBar />
    <TicketTable />
  </main>
</template>

<script setup>
import TicketSearchBar from "@/features/ticket/TicketSearchBar.vue";
import TicketTable from "@/features/ticket/TicketTable.vue";
</script>

<style scoped></style>
