import { BASE_API_URL } from "@/utils/constUtil.js";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const accountInfo = ref(null);
  const isLoggedIn = ref(false);

  const isAdmin = computed(() => accountInfo.value?.role === "admin");

  async function login(accountName, password) {
    const response = await fetch(`${BASE_API_URL}/auth`, {
      method: "POST",
      body: new URLSearchParams({ accountName, password }),
    });
    const result = await response.json();

    if (response.ok && result.status === "success") {
      accountInfo.value = result.data;
      isLoggedIn.value = true;
      saveToStorage();
    }
  }

  function logout() {
    accountInfo.value = null;
    isLoggedIn.value = false;
    sessionStorage.removeItem("auth");
  }

  function initializeFromStorage() {
    const saved = sessionStorage.getItem("auth");
    if (saved) {
      const { accountInfo: savedAccount, isLoggedIn: savedLogin } =
        JSON.parse(saved);
      accountInfo.value = savedAccount;
      isLoggedIn.value = savedLogin;
    }
  }

  function saveToStorage() {
    sessionStorage.setItem(
      "auth",
      JSON.stringify({
        accountInfo: accountInfo.value,
        isLoggedIn: isLoggedIn.value,
      })
    );
  }

  return {
    accountInfo,
    isLoggedIn,
    isAdmin,
    initializeFromStorage,
    login,
    logout,
  };
});
