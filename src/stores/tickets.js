import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref([]);
  const filteredTickets = ref([]);

  const isFiltering = ref(false);
  const finalTickets = computed(() =>
    isFiltering.value ? filteredTickets.value : tickets.value
  );

  const issueId = ref("");
  const issueDescription = ref("");
  const issueState = ref("");

  function resetTicketsFilter() {
    issueId.value = "";
    issueDescription.value = "";
    issueState.value = "";
    isFiltering.value = false;
  }

  function ticketsFilter() {
    filteredTickets.value = tickets.value.filter(
      (ticket) =>
        String(ticket.id).includes(issueId.value) &&
        ticket.description.includes(issueDescription.value) &&
        ticket.state.includes(issueState.value)
    );
    isFiltering.value = true;
  }

  return {
    tickets,
    finalTickets,
    issueId,
    issueDescription,
    issueState,
    resetTicketsFilter,
    ticketsFilter,
  };
});
