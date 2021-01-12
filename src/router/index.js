import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/landing",
    name: "landing",
    component: Landing,

  },
];

const router = new VueRouter({
  routes,
});

export default router;
