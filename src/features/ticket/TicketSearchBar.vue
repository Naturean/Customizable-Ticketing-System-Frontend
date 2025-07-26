<template>
  <div
    class="bg-base-200 rounded-2xl h-auto md:h-30 w-auto my-2 py-4 px-8 grid grid-rows-4 gap-1 md:gap-0 md:grid-cols-4 md:grid-rows-1 items-center"
  >
    <div class="row-1 md:col-1 md:row-1">
      <label class="label text-sm">工单号：</label>
      <input
        type="text"
        class="input w-full md:max-w-3/5"
        placeholder="请输入"
        v-model.lazy.trim="issueId"
      />
    </div>
    <div class="row-2 md:col-2 md:row-1">
      <label class="label text-sm">描述：</label>
      <input
        type="text"
        class="input w-full md:max-w-3/5"
        placeholder="请输入"
        v-model.lazy.trim="issueDescription"
      />
    </div>
    <div class="row-3 md:col-3 md:row-1">
      <label class="label text-sm">状态：</label>
      <input
        type="text"
        class="input w-full md:max-w-3/5"
        placeholder="请输入"
        v-model.lazy.trim="issueState"
      />
    </div>
    <div class="row-4 md:col-4 md:row-1 flex justify-center">
      <button
        class="btn bg-blue-500 hover:brightness-120 text-white mr-2 w-20 transition-all duration-300"
        @click.stop="onSearch"
      >
        查询
      </button>
      <button class="btn ml-2 w-20" @click.stop="onReset">重置</button>
    </div>
  </div>
</template>

<script setup>
import { useTicketSearch } from "./useTicketSearch.js";

const { issueId, issueDescription, issueState, onSearch, onReset } =
  useTicketSearch();
</script>

<style scoped></style>
