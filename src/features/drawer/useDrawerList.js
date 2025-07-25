import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

export function useDrawerList() {
  const menuItems = ref([
    {
      title: "工单",
      children: [
        {
          name: "ticket-submit",
          label: "提交工单",
        },
        {
          name: "ticket-my",
          label: "我的工单",
        },
        {
          name: "ticket-todo",
          label: "待办工单",
          requiresAuth: true,
        },
      ],
    },
    {
      title: "账号",
      children: [
        {
          name: "account-personal",
          label: "个人账号",
        },
        {
          name: "account-management",
          label: "账号管理",
          requiresAuth: true,
          requiresAdmin: true,
        },
      ],
    },
  ]);

  const authStore = useAuthStore();
  const { isAdmin, isLoggedIn } = storeToRefs(authStore);

  const filteredMenuItems = computed(() => {
    return menuItems.value
      .map((group) => {
        return {
          ...group,
          children: group.children.filter((item) => {
            if (!item.requiresAuth) return true;
            if (!isLoggedIn.value) return false;
            if (item.requiresAdmin && !isAdmin.value) return false;
            return true;
          }),
        };
      })
      .filter((group) => group.children.length > 0);
  });

  return { menuItems: filteredMenuItems };
}
