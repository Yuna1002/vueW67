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
        {
          path: "carts",
          component: () => import("../views/front/CartsView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      component: () => import("../views/admin/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },
        {
          path: "coupon",
          component: () => import("../views/admin/AdminCoupon.vue"),
        },
      ],
    },
  ],
});

export default router;
