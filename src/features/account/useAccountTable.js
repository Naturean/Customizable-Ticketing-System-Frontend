import { getStaff } from "@/services/apiStaff.js";
import { ref, onMounted } from "vue";

const staffRoleMap = {
  admin: "管理员",
  staff: "员工",
};

export function useAccountTable() {
  const accounts = ref([]);
  const isLoading = ref(true);

  onMounted(async () => {
    isLoading.value = true;

    const response = await getStaff();
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      return;
    }

    accounts.value = result.data.map((account) => {
      return {
        id: account.id,
        staffName: account.staffName,
        staffRole: staffRoleMap[account.staffRole],
        accountName: account.accountName,
      };
    });

    isLoading.value = false;
  });

  return { accounts, isLoading };
}
