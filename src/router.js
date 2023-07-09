import * as VueRouter from "vue-router";

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/c1/Index.vue"),
    },
    {
      path: "/c1",
      name: '1.setup',
      component: () => import("./views/c1/Index.vue"),
    },
  ],
});
