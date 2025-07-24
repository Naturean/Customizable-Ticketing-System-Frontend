<template>
  <main
    class="flex flex-col flex-1 items-center justify-center"
    v-if="!isLoggedIn"
  >
    <h1 class="text-2xl font-bold my-2">您尚未登录</h1>
    <RouterLink :to="{ name: 'login' }" class="btn my-2">前往登录</RouterLink>
  </main>

  <main class="flex flex-1 items-center justify-center p-4" v-else>
    <div class="w-xs sm:w-sm md:w-md lg:w-lg transition-all duration-300">
      <fieldset
        class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
      >
        <legend class="fieldset-legend">个人账号</legend>

        <label class="label">头像</label>
        <div class="avatar flex justify-center">
          <div class="w-24 lg:w-36 rounded-full cursor-pointer transition-all duration-300">
            <label for="avatar-input" class="cursor-pointer">
              <input
                id="avatar-input"
                class="hidden"
                type="file"
                accept="image/*"
                @change="onAvatarChange"
              />
              <img :src="avatarUrl" />
            </label>
          </div>
        </div>

        <label class="label">姓名</label>
        <input
          type="text"
          class="input w-auto"
          :value="accountInfo.staffName"
          disabled
        />

        <label class="label">身份</label>
        <input
          type="text"
          class="input w-auto"
          :value="accountInfo.staffRole"
          disabled
        />

        <label class="label">账号名称</label>
        <input type="text" class="input w-auto" v-model="accountName" />

        <label class="label">密码</label>
        <input type="password" class="input w-auto" v-model="password" />

        <div class="flex justify-around">
          <button
            class="btn btn-neutral mr-1 my-2 w-2/5 transition-all duration-300"
            @click.stop="onSave"
          >
            <span class="loading loading-spinner" v-if="isSaving"></span
            ><span v-else>保存</span>
          </button>
          <button
            class="btn ml-1 my-2 w-2/5 transition-all duration-300"
            @click.stop="onLogout"
          >
            注销
          </button>
        </div>
      </fieldset>
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const AuthStore = useAuthStore();
const { accountInfo, isLoggedIn } = storeToRefs(AuthStore);

import { ref } from "vue";
import { BASE_API_URL } from "@/utils/constUtil.js";
const accountName = ref(accountInfo.value?.accountName);
const password = ref("");
const avatarUrl = ref(accountInfo.value?.avatarUrl);
const avatarFile = ref(null);

function onAvatarChange(event) {
  const file = event.target.files[0];

  avatarUrl.value = URL.createObjectURL(file);
  avatarFile.value = file;
}

const isSaving = ref(false);

async function onSave() {
  isSaving.value = true;

  var formdata = new FormData();
  formdata.append("id", accountInfo.value.id);
  formdata.append("accountName", accountName.value);
  formdata.append("password", password.value);
  formdata.append("avatar", avatarFile.value);

  console.log(formdata);

  const response = await fetch(`${BASE_API_URL}/staff`, {
    method: "PATCH",
    body: formdata,
  });
  const result = await response.json();

  if (!response.ok || result.status !== "success") {
    return;
  }

  isSaving.value = false;
}
</script>

<style scoped></style>
