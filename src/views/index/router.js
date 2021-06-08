export default {
  name: "index",
  path: "/index",
  meta: {
    title: "首页",
  },
  component: () => import("../Home.vue"),
  children: [
    {
      name: "index",
      path: "/index",
      meta: {
        title: "首页",
      },
      component: () => import("./index.vue"),
    },
  ],
};
