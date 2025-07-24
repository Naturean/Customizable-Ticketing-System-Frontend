import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "@/utils/constUtil.js";
import { convertIsoStringToDateTime } from "@/utils/dateUtil.js";
import { useCurrentDetailedTicket } from "@/stores/currentDetailedTicket.js";
import { useRouter } from "vue-router";

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

  // Try loading ticket info
  onMounted(async () => {
    const ticketSubmitted = JSON.parse(
      localStorage.getItem("ticket-submitted")
    );

    if (!ticketSubmitted.includes(Number(route.params.id))) {
      router.push({ name: "not-found" });
      return;
    }

    if (ticket.value) {
      isLoading.value = false;
      return;
    }

    const response = await fetch(
      `${BASE_API_URL}/issue/?id=${route.params.id}`
    );
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      isLoading.value = false;
      return;
    }

    let staffName = null;
    if (result.data.staffId) {
      const staffResponse = await fetch(
        `${BASE_API_URL}/staff?id=${result.data.staffId}`
      );
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
      fixedDate: result.data.fixedDate
        ? convertIsoStringToDateTime(result.data.fixedDate)
        : "无",
      staffName: result.data.staffId ? staffName || "未知" : "无",
    };

    isLoading.value = false;
  });

  return { ticket, isLoading };
}
