import { createRouter, createWebHistory } from "vue-router";
import auth from "../services/auth";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/kontakt",
    alias: "/kontakny-formular",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
  },
  {
    path: "/projekt/:id/:slug",
    name: "Project",
    component: () =>
      import(/* webpackChunkName: "project" */ "../views/Project.vue"),
  },
  {
    path: "/projekty",
    name: "Projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/Projects.vue"),
    props: (route) => ({ tag: route.query.tag }),
  },
  {
    path: "/vytvorit-projekt",
    name: "Projects/create",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "new_project" */ "../views/NewProject.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresGuest: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    next({ name: "Login" });
  } else if (to.meta.requiresGuest && auth.isLoggedIn()) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
