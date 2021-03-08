import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing";
import Engineers from "@/views/Engineers";
import Jobs from "@/views/Jobs";
import Profile from "@/views/Profile";
import ProfileUpdate from "@/views/ProfileUpdate";
import Job from "@/components/Job";
import AdminInventory from "@/components/Admin/AdminInventory";
import Request from "@/components/Request";
import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
    meta: {
      requireCustomer: true,
    },
  },
  {
    path: "/job/:id",
    name: "User Job",
    component: Job,
    props: true,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/landing",
    name: "landing",
    component: Landing,
    meta: {
      requireVisitors: true,
    },
  },
  {
    path: "/engineers",
    name: "engineers",
    component: Engineers,
    meta: {
      requireAdmin:true,
    },
  },
  {
    path: "/inventory",
    name: "inventory",
    component: AdminInventory,
    meta: {
      requireCustomer:true,
    },
  },
  {
    path: "/requests",
    name: "requests",
    component: Request,
    meta: {
      requireCustomer:true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/updateProfile",
    name: "updateProfile",
    component: ProfileUpdate,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
