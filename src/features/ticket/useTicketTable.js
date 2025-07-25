import { convertIsoStringToDateTime } from "@/utils/dateUtil.js";
import { fetchStaffInfoBatch } from "@/utils/staffUtil.js";
import { BASE_API_URL } from "@/utils/constUtil.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { getIssue } from "@/services/apiIssue.js";

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

export function useTicketTable() {
  const tickets = ref([]);
  const isLoading = ref(true);

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    isLoading.value = true;

    const authStore = useAuthStore();
    const { accountInfo } = storeToRefs(authStore);

    let response = null;
    if (route.name === "ticket-my") {
      const ticketSubmitted = localStorage.getItem("ticket-submitted");
      response = await getIssue({ id: ticketSubmitted });
    } else if (route.name === "ticket-todo") {
      if (accountInfo && accountInfo.value.staffRole === "admin") {
        response = await getIssue();
      } else if (accountInfo && accountInfo.value.staffRole === "staff") {
        response = await getIssue({ staffId: accountInfo.value.id });
      } else {
        // unauthenticated user
        router.push({ name: "root" });
        return;
      }
    }

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      isLoading.value = false;
      return;
    }

    const staffIds = result.data
      .filter((ticket) => ticket.staffId)
      .map((ticket) => ticket.staffId);

    const staffInfoMap = await fetchStaffInfoBatch(staffIds);

    tickets.value = result.data.map((ticket) => {
      return {
        id: ticket.id,
        poster: ticket.poster,
        createDate: convertIsoStringToDateTime(ticket.createDate),
        description: ticket.description,
        imageUrls: JSON.parse(ticket.image),
        stateColor: stateColorMap[ticket.state],
        state: stateMap[ticket.state],
        reply: ticket.reply ? ticket.reply : "无",
        fixedDate: ticket.fixedDate
          ? convertIsoStringToDateTime(ticket.fixedDate)
          : "无",
        staffId: ticket.staffId,
        staffName: ticket.staffId
          ? staffInfoMap[ticket.staffId] || "未知"
          : "无",
      };
    });

    isLoading.value = false;
  });

  return { tickets, isLoading };
}
