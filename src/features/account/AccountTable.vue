<template>
  <Loading class="mt-6" v-if="isLoading" />
  <div class="bg-base-200 rounded-2xl h-auto w-auto my-2 p-4" v-else>
    <div class="overflow-x-auto">
      <div class="text-center" v-if="accounts.length === 0">尚无员工数据</div>
      <table
        class="table table-sm lg:table-md w-full md:table-fixed"
        v-if="accounts.length > 0"
      >
        <thead>
          <tr>
            <th>员工号</th>
            <th>员工姓名</th>
            <th>身份</th>
            <th>账号名</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="account in accounts"
            class="hover:bg-base-300 transition-colors duration-200"
          >
            <th>{{ account.id }}</th>
            <td>{{ account.staffName }}</td>
            <td>{{ account.staffRole }}</td>
            <td>{{ account.accountName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Loading from "@/ui/Loading.vue";
import { useAccountTable } from "./useAccountTable.js";
const { accounts, isLoading } = useAccountTable();
</script>

<style scoped></style>
