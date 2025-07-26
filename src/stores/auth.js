import { loginApi } from "@/services/apiAuth.js";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const accountInfo = ref(null);
  const isLoggedIn = ref(false);

  const isAdmin = computed(() => accountInfo.value?.staffRole === "admin");

  const router = useRouter();

  async function login(accountName, password) {
    const response = await loginApi({ accountName, password });
    const result = await response.json();

    if (response.ok && result.status === "success") {
      accountInfo.value = result.data;
      isLoggedIn.value = true;
      saveToStorage(password);
      router.push({ name: "root" });
    } else {
      alert("登录失败！");
    }
  }

  function logout() {
    accountInfo.value = null;
    isLoggedIn.value = false;
    sessionStorage.removeItem("auth");
  }

  async function initializeFromStorage() {
    const saved = sessionStorage.getItem("auth");
    if (saved) {
      const { accountInfo: savedAccount, isLoggedIn: savedLogin } =
        JSON.parse(saved);
      accountInfo.value = savedAccount;
      isLoggedIn.value = savedLogin;
      await checkUpdateWithServer();
    }
  }

  function saveToStorage(password) {
    sessionStorage.setItem(
      "auth",
      JSON.stringify({
        accountInfo: accountInfo.value,
        isLoggedIn: isLoggedIn.value,
        pseudoToken: btoa(password),
      })
    );
  }

  async function checkUpdateWithServer() {
    const saved = sessionStorage.getItem("auth");
    const { pseudoToken } = JSON.parse(saved);
    const accountName = accountInfo.value.accountName;

    try {
      const response = await loginApi({
        accountName: accountName,
        password: atob(pseudoToken),
      });
      const result = await response.json();

      if (response.ok && result.status === "success") {
        accountInfo.value = result.data;
      }
    } catch (error) {
      console.error("Fail to check update of account", error);
    }
  }

  return {
    accountInfo,
    isLoggedIn,
    isAdmin,
    initializeFromStorage,
    login,
    logout,
    checkUpdateWithServer,
  };
});
