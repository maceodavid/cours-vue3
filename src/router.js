import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import HomePage from "./pages/HomePage.vue";
import RegisterPage from "./pages/RegisterPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      next({ name: "register" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
