<template>
  <div class="tooltip tooltip-left" :data-tip="avatarTip">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <RouterLink :to="{ name: 'account-personal' }">
          <img :src="avatarUrl" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { accountInfo } = storeToRefs(authStore);

const avatarUrl = computed(() =>
  accountInfo.value
    ? accountInfo.value.avatarUrl
    : "http://127.0.0.1:3000/imgs/default_avatar.png"
);
const avatarTip = computed(() =>
  accountInfo.value ? accountInfo?.value.accountName : "未登录"
);
</script>

<style scoped></style>
