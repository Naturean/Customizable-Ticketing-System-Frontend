import { updateIssue } from "@/services/apiIssue.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

export function useTicketComplete({ openDialog }) {
  const reply = ref(null);
  const errorMessageStaff = ref("");

  const authStore = useAuthStore();
  const { accountInfo } = storeToRefs(authStore);
  const staffId = accountInfo.value?.id;

  const route = useRoute();
  const ticketId = route.params.id;

  async function onComplete() {
    if (!ticketId || !staffId) {
      return;
    }

    if (!reply.value || reply.value === "") {
      errorMessageStaff.value = "请填写工单回复！";
      openDialog();
      return;
    }

    const response = await updateIssue({
      id: ticketId,
      staffId: staffId,
      reply: reply.value,
    });
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      errorMessageStaff.value = "完成失败，请重新尝试！";
      openDialog();
      return;
    }

    location.reload();
  }

  return { reply, errorMessageStaff, onComplete };
}
