import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/front/FrontView.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
        },
      ],
    },
  ],
});

export default router;
