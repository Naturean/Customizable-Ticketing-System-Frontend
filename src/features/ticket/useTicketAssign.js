import { useAuthStore } from "@/stores/auth.js";
import { BASE_API_URL } from "@/utils/constUtil.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

export function useTicketAssign() {
  const staffId = ref(null);
  const assignSuccess = ref(false);

  const authStore = useAuthStore();
  const { accountInfo } = storeToRefs(authStore);
  const adminId = accountInfo.value.id;

  const route = useRoute();
  const ticketId = route.params.id;

  async function onAssign() {
    if (!ticketId || !staffId || !adminId) {
      return;
    }

    const response = await fetch(`${BASE_API_URL}/issue`, {
      method: "PATCH",
      body: new URLSearchParams({
        id: ticketId,
        staffId: staffId.value,
        adminId: adminId,
      }),
    });
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      assignSuccess.value = false;
      openDialog();
      return;
    }

    assignSuccess.value = true;
    openDialog();
  }

  function openDialog() {
    const assignmodal = document.getElementById("assignmodal");
    assignmodal.showModal();
  }

  return { staffId, assignSuccess, onAssign };
}
