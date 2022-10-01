import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/post",
      name: "post",
      component: () => import("../views/Post.vue"),
      // meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: '/asset/:id',
      name: 'asset',
      component: () => import("../views/Asset.vue"),
      props: true
    },
    {
      path: "/technician",
      name: "technician",
      component: () => import("../views/Technician.vue"),
    },
  ],
});

export default router;
