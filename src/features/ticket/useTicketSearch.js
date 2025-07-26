import { useTicketsStore } from "@/stores/tickets.js";
import { storeToRefs } from "pinia";

export function useTicketSearch() {
  const ticketsStore = useTicketsStore();
  const { issueId, issueDescription, issueState } = storeToRefs(ticketsStore);
  const { ticketsFilter, resetTicketsFilter } = ticketsStore;

  function onSearch() {
    ticketsFilter();
  }

  function onReset() {
    resetTicketsFilter();
  }

  return { issueId, issueDescription, issueState, onSearch, onReset };
}
