import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "@/utils/constUtil.js";
import { convertIsoStringToDateTime } from "@/utils/dateUtil.js";
import { useCurrentDetailedTicket } from "@/stores/currentDetailedTicket.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { getIssue } from "@/services/apiIssue.js";
import { getStaff } from "@/services/apiStaff.js";

const stateColorMap = {
  wait: "bg-neutral-300",
  fixing: "bg-blue-400",
  complete: "bg-green-400",
};

const stateMap = {
  wait: "待处理",
  fixing: "处理中",
  complete: "已解决",
};

export function useTicketDetail() {
  const route = useRoute();
  const router = useRouter();

  const { currentDetailedTicket } = useCurrentDetailedTicket();

  const ticket = ref(
    currentDetailedTicket.value?.id === Number(route.params.id)
      ? currentDetailedTicket.value
      : null
  );

  const isLoading = ref(ticket.value ? false : true);

  const authStore = useAuthStore();
  const { accountInfo, isAdmin } = storeToRefs(authStore);

  // Try loading ticket info
  onMounted(async () => {
    const ticketSubmitted = JSON.parse(
      localStorage.getItem("ticket-submitted")
    );

    const isSelfSubmitted = ticketSubmitted.includes(Number(route.params.id));
    if (!isAdmin.value && !isSelfSubmitted) {
      if (!accountInfo.value) {
        // not staff
        router.push({ name: "forbidden" });
        return;
      }

      // for staff (non-admin)
      if (!ticket.value) {
        // try to get matching issue
        const response = await getIssue({
          id: route.params.id,
          staffId: accountInfo.value.staffRole,
        });

        const result = await response.json();

        if (!response.ok || result.status !== "success") {
          router.push({ name: "not-found" });
          return;
        }
      } else if (ticket.value.staffId !== accountInfo.value.id) {
        // ticket exists but doesn't belong to this staff
        router.push({ name: "forbidden" });
        return;
      }
    }

    if (ticket.value) {
      isLoading.value = false;
      return;
    }

    const response = await getIssue({ id: route.params.id });
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      isLoading.value = false;
      return;
    }

    let staffName = null;
    if (result.data.staffId) {
      const staffResponse = await getStaff(result.data.staffId);
      const staffResult = await staffResponse.json();
      staffName = staffResult.data.staffName;
    }

    ticket.value = {
      id: result.data.id,
      poster: result.data.poster,
      createDate: convertIsoStringToDateTime(result.data.createDate),
      description: result.data.description,
      imageUrls: JSON.parse(result.data.image),
      stateColor: stateColorMap[result.data.state],
      state: stateMap[result.data.state],
      reply: result.data.reply,
      fixedDate: result.data.fixedDate
        ? convertIsoStringToDateTime(result.data.fixedDate)
        : "无",
      staffName: result.data.staffId ? staffName || "未知" : "无",
    };

    isLoading.value = false;
  });

  return { ticket, isLoading };
}
