import { ref } from "vue";

export function useDrawerList() {
  const menuItems = ref([
    {
      title: "工单",
      children: [
        { name: "ticket-submit", label: "提交工单" },
        { name: "ticket-my", label: "我的工单" },
        { name: "ticket-todo", label: "待办工单" },
      ],
    },
    {
      title: "账号",
      children: [
        { name: "account-personal", label: "个人账号" },
        { name: "account-management", label: "账号管理" },
      ],
    },
  ]);

  return { menuItems };
}
