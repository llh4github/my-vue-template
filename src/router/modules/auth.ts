export default {
  path: "/auth",
  redirect: "/auth/role",
  meta: {
    icon: "informationLine",
    title: "权限管理",
    // showLink: false,
    rank: 2,
  },
  children: [
    {
      path: "/auth/role",
      name: "role-page",
      component: () => import("@/views/auth/role/index.vue"),
      meta: {
        title: "角色管理",
      },
    },
    {
      path: "/auth/resource/url",
      name: "resource-url",
      component: () => import("@/views/auth/resource-url/index.vue"),
      meta: {
        title: "URL权限管理",
      },
    },
  ],
} as RouteConfigsTable
