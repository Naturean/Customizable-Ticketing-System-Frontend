import { createStaff } from "@/services/apiStaff.js";
import { ref } from "vue";

export function useCreateStaff() {
  const staffName = ref("");
  const accountName = ref("");
  const password = ref("");

  const isCreating = ref(false);
  const errorMessage = ref("");

  async function onCreateStaff() {
    isCreating.value = true;
    try {
      const response = await createStaff(
        JSON.stringify({
          staffName: staffName.value,
          accountName: accountName.value,
          password: password.value,
        })
      );
      const result = await response.json();

      if (response.ok && result.status === "success") {
        location.reload();
      } else if (result.message === "Username has been resgistered") {
        errorMessage.value = "用户名已被注册，请修改并重试";
        openDialog();
      } else {
        errorMessage.value = "未知错误，请检查并重试";
        openDialog();
      }
    } finally {
      isCreating.value = false;
    }
  }

  function openDialog() {
    const createStaffErrorModal = document.getElementById(
      "create-staff-error-modal"
    );
    createStaffErrorModal.showModal();
  }

  return {
    staffName,
    accountName,
    password,
    isCreating,
    errorMessage,
    onCreateStaff,
  };
}
