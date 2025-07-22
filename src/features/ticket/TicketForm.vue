<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
    <legend class="fieldset-legend">工单信息</legend>

    <label class="label">上传者 *</label>
    <input
      type="text"
      class="input w-auto"
      placeholder="你的名字"
      v-model="poster"
      required
    />

    <label class="label">问题描述 *</label>
    <textarea
      class="textarea resize-none w-auto min-h-40 lg:min-h-50"
      placeholder="详细描述问题"
      v-model="description"
      required
    ></textarea>

    <label class="label">上传图片</label>
    <input type="file" class="file-input w-auto" accept="image/*" multiple />

    <button class="btn my-4" @click="onSubmit">提交</button>
  </fieldset>
</template>

<script setup>
import { ref } from "vue";

const poster = ref("");
const description = ref("");
const image = ref("");

function onSubmit() {
  const issue = {
    title: title.value,
    submitor: poster.value,
    description: description.value,
    image: image.value,
  };

  console.log(issue);
}
</script>

<style scoped></style>
