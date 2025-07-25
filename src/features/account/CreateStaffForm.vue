<template>
  <form
    id="create-staff-form"
    class="flex justify-center"
    @submit.prevent="onCreateStaff"
  >
    <fieldset
      class="fieldset border-none rounded-box w-70 md:w-90 h-fit border p-4 transition-all duration-300"
      form="login-form"
    >
      <label class="label">姓名</label>
      <input
        type="text"
        class="input w-full"
        placeholder="姓名"
        required
        v-model.lazy.trim="staffName"
      />

      <label class="label">用户名</label>
      <input
        type="text"
        class="input w-full"
        placeholder="用户名"
        required
        v-model.lazy.trim="accountName"
      />

      <label class="label">密码</label>
      <input
        type="password"
        class="input validator w-full"
        placeholder="密码"
        minlength="8"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="密码须至少有8个及以上的字符，包含数字、大小写字母"
        required
        v-model.lazy.trim="password"
      />
      <p class="validator-hint hidden">
        密码须至少有8个及以上的字符，包含数字、大小写字母
      </p>

      <div class="flex justify-center">
        <button class="btn btn-neutral mt-4 w-full" :disabled="isCreating">
          <span class="loading loading-spinner" v-if="isCreating"></span
          ><span v-else>创建</span>
        </button>
      </div>
    </fieldset>
  </form>

  <dialog id="create-staff-error-modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">错误</h3>
      <p class="py-4">
        {{ errorMessage }}
      </p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>关闭</button>
    </form>
  </dialog>
</template>

<script setup>
import { useCreateStaff } from "./useCreateStaff.js";

const {
  staffName,
  accountName,
  password,
  isCreating,
  errorMessage,
  onCreateStaff,
} = useCreateStaff();
</script>

<style scoped></style>
