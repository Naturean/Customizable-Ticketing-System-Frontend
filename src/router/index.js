import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/ticket/submit",
      component: () => import("@/views/RootView.vue"),
      children: [
        {
          path: "ticket",
          name: "ticket",
          redirect: "/ticket/submit",
          children: [
            {
              path: "submit",
              name: "ticket-submit",
              component: () => import("@/views/TicketSubmitView.vue"),
            },
            {
              path: "my",
              name: "ticket-my",
              component: () => import("@/views/TicketMyView.vue"),
            },
            {
              path: "todo",
              name: "ticket-todo",
              meta: { requiresAuth: true },
              component: () => import("@/views/TicketTodoView.vue"),
            },
            {
              path: ":id",
              name: "ticket-detail",
              component: () => import("@/views/TicketMyDetailView.vue"),
            },
          ],
        },
        {
          path: "account",
          name: "account",
          redirect: "/account/personal",
          children: [
            {
              path: "personal",
              name: "account-personal",
              component: () => import("@/views/AccountPersonalView.vue"),
            },
            {
              path: "management",
              name: "account-management",
              meta: { requiresAuth: true, requiresAdmin: true },
              component: () => import("@/views/AccountManagementView.vue"),
            },
          ],
        },
        {
          path: "auth",
          name: "auth",
          redirect: "/auth/login",
          children: [
            {
              path: "login",
              name: "login",
              component: () => import("@/views/LoginView.vue"),
            },
          ],
        },
        {
          path: "403",
          name: "forbidden",
          component: () => import("@/views/ForbiddenView.vue"),
        },
        {
          path: ":pathMatch(.*)*",
          name: "not-found",
          component: () => import("@/views/NotFoundView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const { isLoggedIn, isAdmin } = storeToRefs(authStore);
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "account-personal" };
  }
  if (to.meta.requiresAdmin && !isAdmin.value) {
    return { name: "forbidden" };
  }
  return true;
});

export default router;
