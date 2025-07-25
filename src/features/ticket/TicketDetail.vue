<template>
  <Loading v-if="isLoading" />

  <main v-if="!isLoading">
    <!-- Info -->
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
    >
      <legend class="fieldset-legend">工单详情</legend>

      <label class="label">工单号</label>
      <div class="my-2 whitespace-pre-line">{{ ticket.id }}</div>

      <label class="label">上传者</label>
      <div class="my-2 whitespace-pre-line">{{ ticket.poster }}</div>

      <label class="label">创建时间</label>
      <div class="my-2 whitespace-pre-line">{{ ticket.createDate }}</div>

      <label class="label">问题描述</label>
      <div class="my-2 whitespace-pre-line">{{ ticket.description }}</div>

      <label class="label">状态</label>
      <div class="my-2 whitespace-pre-line">
        <span>{{ ticket.state }}</span
        ><span
          :class="`badge badge-xs ${ticket.stateColor} rounded-full ml-2`"
        ></span>
      </div>

      <label class="label">回复</label>
      <div class="my-2 whitespace-pre-line">{{ ticket.reply }}</div>

      <label class="label whitespace-pre-line">处理时间</label>
      <div class="my-2">{{ ticket.fixedDate }}</div>

      <label class="label whitespace-pre-line">处理员工</label>
      <div class="my-2">{{ ticket.staffName }}</div>

      <label class="label" v-if="ticket.imageUrls?.length > 0">图片预览</label>
      <div
        class="flex overflow-x-auto gap-2 pb-4 scrollbar-hide"
        v-if="ticket.imageUrls?.length > 0"
      >
        <!-- Horizontal Scroll -->
        <div
          v-for="(imageUrl, index) in ticket.imageUrls"
          :key="index"
          class="flex-none"
        >
          <img
            :src="imageUrl"
            :alt="'Image-' + index"
            class="max-h-40 object-contain rounded-lg shadow-sm"
          />
        </div>
      </div>
    </fieldset>

    <!-- Staff Action -->
    <div
      class="mt-2 bg-base-200 border-base-300 rounded-box border p-4"
      v-if="
        (accountInfo?.staffRole === 'admin' && ticket.state === '待处理') ||
        (accountInfo?.staffRole === 'staff' &&
          ticket.state === '处理中' &&
          accountInfo?.id === ticket.staffId)
      "
    >
      <!-- Admin -->
      <label class="label" v-if="accountInfo?.staffRole === 'admin'"
        >员工号</label
      >
      <input
        type="number"
        class="input w-full my-4"
        value="1"
        min="1"
        required
        v-model="staffId"
        v-if="accountInfo?.staffRole === 'admin'"
      />
      <!-- Staff -->
      <label class="label" v-if="accountInfo?.staffRole === 'staff'"
        >回复</label
      >
      <textarea
        class="textarea resize-none w-full min-h-40 lg:min-h-50 my-4"
        placeholder="填写工单回复"
        title="填写工单回复"
        v-model="reply"
        required
        v-if="accountInfo?.staffRole === 'staff'"
      ></textarea>
      <!-- Submit Button -->
      <button class="btn btn-neutral w-full" @click="onButtonClick">
        {{ buttonTextMap[accountInfo.staffRole] }}
      </button>
    </div>

    <dialog id="error-modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">错误</h3>
        <p class="py-4">
          {{
            accountInfo?.staffRole === "admin"
              ? errorMessageAdmin
              : errorMessageStaff
          }}
        </p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </main>
</template>

<script setup>
import { useTicketDetail } from "./useTicketDetail.js";
import { useTicketAssign } from "./useTicketAssign.js";
import Loading from "@/ui/Loading.vue";

const buttonTextMap = {
  admin: "分配工单",
  staff: "完成工单",
};

function openDialog() {
  const errorModal = document.getElementById("error-modal");
  errorModal.showModal();
}

const { ticket, isLoading } = useTicketDetail();
const { staffId, errorMessageAdmin, onAssign } = useTicketAssign({
  openDialog,
});
const { reply, errorMessageStaff, onComplete } = useTicketComplete({
  openDialog,
});

function onButtonClick() {
  if (accountInfo.value?.staffRole === "admin") {
    onAssign();
  } else {
    onComplete();
  }
}

import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { useTicketComplete } from "./useTicketComplete.js";

const authStore = useAuthStore();
const { accountInfo } = storeToRefs(authStore);
</script>

<style scoped></style>
