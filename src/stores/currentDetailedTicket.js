import { ref } from "vue";
import { defineStore } from "pinia";
import { storeToRefs } from "pinia";

const useCurrentDetailedTicketStore = defineStore(
  "currentDetailedTicket",
  () => {
    const currentDetailedTicket = ref(null);

    function setCurrentDetailedTicket(ticket) {
      currentDetailedTicket.value = ticket;
    }

    return { currentDetailedTicket, setCurrentDetailedTicket };
  }
);

export function useCurrentDetailedTicket() {
  const currentDetailedTicketStore = useCurrentDetailedTicketStore();
  const { currentDetailedTicket } = storeToRefs(currentDetailedTicketStore);
  const { setCurrentDetailedTicket } = currentDetailedTicketStore;

  return { currentDetailedTicket, setCurrentDetailedTicket };
}
