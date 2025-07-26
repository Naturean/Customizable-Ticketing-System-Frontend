import { updateIssue } from "@/services/apiIssue.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

export function useTicketAssign({ openDialog }) {
  const staffId = ref(null);
  const errorMessageAdmin = ref("");

  const authStore = useAuthStore();
  const { accountInfo } = storeToRefs(authStore);
  const adminId = accountInfo.value?.id;

  const route = useRoute();
  const ticketId = route.params.id;

  async function onAssign() {
    if (!ticketId || !staffId || !adminId) {
      return;
    }

    const response = await updateIssue({
      id: ticketId,
      staffId: staffId.value,
      adminId: adminId,
    });
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      errorMessageAdmin.value = "分配失败，请重新尝试！";
      if (result.message === `Staff ${staffId.value} is not existed!`) {
        errorMessageAdmin.value = "此员工不存在，请检查并重试！";
      }
      openDialog();
      return;
    }

    location.reload();
  }

  return { staffId, errorMessageAdmin, onAssign };
}
