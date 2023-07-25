import * as VueRouter from "vue-router";

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/c1",
    },
    {
      path: "/c1",
      name: "面向对象和UML类图",
      component: () => import("./views/c1/Index.vue"),
    },
    {
      path: "/c7",
      name: "迭代器模式",
      component: () => import("./views/c7/Index.vue"),
    },
  ],
});
