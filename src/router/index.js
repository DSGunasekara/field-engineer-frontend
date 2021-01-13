import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing";
import Engineers from "@/views/Engineers";
import Jobs from "@/views/Jobs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/landing",
    name: "landing",
    component: Landing,

  },
  {
    path: "/engineers",
    name: "engineers",
    component: Engineers,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
