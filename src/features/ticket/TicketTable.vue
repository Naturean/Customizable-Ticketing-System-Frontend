<template>
  <Loading class="mt-6" v-if="isLoading" />
  <div class="bg-base-200 rounded-2xl h-auto w-auto my-2 p-4" v-else>
    <div class="overflow-x-auto">
      <div class="text-center" v-if="tickets.length === 0">尚无工单数据</div>
      <table
        class="table table-sm lg:table-md w-full md:table-fixed"
        v-if="tickets.length > 0"
      >
        <thead>
          <tr>
            <th class="lg:w-24">工单号</th>
            <th>上传者</th>
            <th class="lg:min-w-30">创建时间</th>
            <th>问题描述</th>
            <th>状态</th>
            <th class="lg:min-w-30">处理时间</th>
            <th>处理员工</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in tickets"
            class="hover:bg-base-300 transition-colors duration-200 cursor-pointer"
            @click="goToDetail(ticket)"
          >
            <th>{{ ticket.id }}</th>
            <td>{{ ticket.poster }}</td>
            <td>{{ ticket.createDate }}</td>
            <td class="truncate max-w-xs md:max-w-none">
              {{ ticket.description }}
            </td>
            <td class="min-w-20 sm:min-w-30 md:min-w-none">
              <span>{{ ticket.state }}</span
              ><span
                :class="`badge badge-xs ${ticket.stateColor} rounded-full ml-2`"
              ></span>
            </td>
            <td>
              {{ ticket.fixedDate }}
            </td>
            <td>{{ ticket.staffName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Loading from "@/ui/Loading.vue";
import { useCurrentDetailedTicket } from "../../stores/currentDetailedTicket.js";
import { useTicketTable } from "./useTicketTable.js";
const { tickets, isLoading } = useTicketTable();

import { useRouter } from "vue-router";
const router = useRouter();

function goToDetail(ticket) {
  const { setCurrentDetailedTicket } = useCurrentDetailedTicket();

  setCurrentDetailedTicket(ticket);
  router.push({
    name: "ticket-detail",
    params: { id: ticket.id },
  });
}
</script>

<style scoped></style>
