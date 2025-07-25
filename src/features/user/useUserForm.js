import { ref } from "vue";
import { BASE_API_URL } from "@/utils/constUtil.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { updateStaff } from "@/services/apiStaff.js";
import { useRouter } from "vue-router";

export function useUserForm() {
  const authStore = useAuthStore();
  const { logout } = authStore;
  const { accountInfo } = storeToRefs(authStore);

  const accountName = ref(accountInfo.value?.accountName);
  const password = ref("");
  const avatarUrl = ref(accountInfo.value?.avatarUrl);
  const avatarFile = ref(null);

  const isFormChange = ref(false);
  const isSaving = ref(false);
  const router = useRouter();

  function onAvatarChange(event) {
    const file = event.target.files[0];

    avatarUrl.value = URL.createObjectURL(file);
    avatarFile.value = file;
  }

  async function onSave() {
    if (
      accountName.value === accountInfo.value?.accountName &&
      password.value === "" &&
      avatarFile.value === null
    ) {
      return;
    }

    isSaving.value = true;

    var formdata = new FormData();
    formdata.append("id", accountInfo.value.id);
    formdata.append("accountName", accountName.value);
    formdata.append("password", password.value);
    formdata.append("avatar", avatarFile.value);

    const response = await updateStaff(formdata);
    const result = await response.json();

    isSaving.value = false;

    if (!response.ok || result.status !== "success") {
      return;
    }

    alert("保存成功，请重新登录");
    router.push({ name: "login" });
  }

  return {
    accountInfo,
    accountName,
    password,
    avatarUrl,
    isSaving,
    isFormChange,
    logout,
    onAvatarChange,
    onSave,
  };
}
