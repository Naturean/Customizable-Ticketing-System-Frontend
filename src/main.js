import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const authStore = useAuthStore();

(async () => {
  try {
    await authStore.initializeFromStorage();
    app.mount("#app");
  } catch (error) {
    console.error("Initailization Error:", error);
  }
})();
