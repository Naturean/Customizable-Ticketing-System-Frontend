<template>
  <!-- Filling Form -->
  <form
    id="ticket-form"
    @submit.prevent="onSubmit"
    v-show="currentStep === 'form'"
  >
    <fieldset
      class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
      form="ticket-form"
    >
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

      <input
        type="file"
        class="file-input w-auto"
        accept="image/*"
        multiple
        @change="onImagesChange"
      />
      <div
        class="flex overflow-x-auto gap-2 pb-4 mt-2 scrollbar-hide"
        v-if="images.length > 0"
      >
        <!-- Horizontal Scroll -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-none relative overflow-hidden"
        >
          <img
            :src="image.url"
            :alt="'Image-' + index"
            class="max-h-40 object-contain rounded-lg shadow-sm"
          />

          <button
            @click.stop="removeImage(index)"
            class="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 opacity-80 bg-neutral-400 text-white rounded-full flex items-center justify-center transition-opacity duration-200 hover:bg-neutral-500"
            type="button"
            aria-label="删除图片"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 transform -translate-x-3/5 translate-y-3/5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <button class="btn my-2">提交</button>
    </fieldset>
  </form>

  <!-- Confirm -->
  <fieldset
    class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
    v-if="currentStep === 'confirm'"
  >
    <legend class="fieldset-legend">确认提交？</legend>

    <label class="label">上传者</label>
    <input type="text" class="input w-auto" :value="poster" readonly />

    <label class="label">问题描述</label>
    <textarea
      class="textarea resize-none w-auto min-h-40 lg:min-h-50"
      :value="description"
      readonly
    ></textarea>

    <label class="label" v-if="images.length > 0">图片预览</label>
    <div
      class="flex overflow-x-auto gap-2 pb-4 scrollbar-hide"
      v-if="images.length > 0"
    >
      <!-- Horizontal Scroll -->
      <div v-for="(image, index) in images" :key="index" class="flex-none">
        <img
          :src="image.url"
          :alt="'Image-' + index"
          class="max-h-40 object-contain rounded-lg shadow-sm"
        />
      </div>
    </div>

    <div class="flex my-2 justify-around">
      <button class="btn w-2/5" @click="onConfirm">确认</button>
      <button class="btn w-2/5" @click="onCancel">取消</button>
    </div>
  </fieldset>

  <!-- Loading -->
  <Loading v-else-if="currentStep === 'uploading'" />

  <!-- Complete -->
  <div
    class="flex flex-col items-center bg-base-200 border-base-300 rounded-box border p-4"
    v-else-if="currentStep === 'complete'"
  >
    <div class="text-center font-bold text-xl my-2">
      {{ isUploadSuccess ? "上传成功" : "上传失败" }}
    </div>
    <div class="text-center mb-4">
      {{ isUploadSuccess ? `您的工单号为：${uploadIssueId}` : "请刷新重试" }}
    </div>

    <button class="btn w-1/2" @click="refresh()">
      {{ isUploadSuccess ? "再次提交" : "重试" }}
    </button>
  </div>
</template>

<script setup>
import Loading from "@/ui/Loading.vue";
import { useTicketForm } from "./useTicketForm.js";

function refresh() {
  location.reload();
}

const {
  poster,
  description,
  images,
  currentStep,
  isUploadSuccess,
  uploadIssueId,
  onImagesChange,
  removeImage,
  onSubmit,
  onConfirm,
  onCancel,
} = useTicketForm();

import { computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";

const formDirty = computed(
  () =>
    poster.value !== "" || description.value !== "" || images.value.length > 0
);

const handleBeforeUnload = (e) => {
  if (formDirty.value) {
    e.preventDefault();
    e.returnValue = "您的表单信息不会被保存，确定要离开吗？";
    return "您的表单信息不会被保存，确定要离开吗？";
  }
};

onBeforeRouteLeave((_to, _from, next) => {
  if (formDirty.value) {
    const answer = window.confirm("您的表单信息不会被保存，确定要离开吗？");
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<style scoped></style>
