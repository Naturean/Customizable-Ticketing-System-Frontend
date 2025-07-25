<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
    <legend class="fieldset-legend">个人账号</legend>

    <label class="label">头像</label>
    <div class="avatar flex justify-center">
      <div
        class="w-24 lg:w-36 rounded-full cursor-pointer transition-all duration-300"
      >
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
      :value="staffRoleMap[accountInfo.staffRole]"
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
        @click.stop="logout"
      >
        注销
      </button>
    </div>
  </fieldset>
</template>

<script setup>
import { useUserForm } from "./useUserForm.js";

const staffRoleMap = {
  admin: "管理员",
  staff: "员工",
};

const {
  accountInfo,
  accountName,
  password,
  avatarUrl,
  isSaving,
  isFormChange,
  logout,
  onAvatarChange,
  onSave,
} = useUserForm();
</script>

<style scoped></style>
