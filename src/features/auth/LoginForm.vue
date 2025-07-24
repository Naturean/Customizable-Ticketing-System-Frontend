<template>
  <form id="login-form" @submit.prevent="onLogin">
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box w-xs h-fit border p-4"
      form="login-form"
    >
      <legend class="fieldset-legend">登录</legend>

      <label class="label">用户名</label>
      <input
        type="text"
        class="input"
        placeholder="用户名"
        required
        v-model.lazy.trim="accountName"
      />

      <label class="label">密码</label>
      <input
        type="password"
        class="input validator"
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
        <button class="btn btn-neutral mt-4 w-1/2" :disabled="isLoggingIn">
          <span class="loading loading-spinner" v-if="isLoggingIn"></span
          ><span v-else>登录</span>
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const accountName = ref("");
const password = ref("");
const isLoggingIn = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function onLogin() {
  isLoggingIn.value = true;
  try {
    await authStore.login(accountName.value, password.value);
    router.push({ name: "root" });
  } finally {
    isLoggingIn.value = false;
  }
}
</script>

<style scoped></style>
